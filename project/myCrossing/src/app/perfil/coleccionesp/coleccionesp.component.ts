import { IItem, IRecipe, items, recipes, translations } from 'animal-crossing';
import { ColeccionespService } from './coleccionesp.service';
import { VerificationService } from 'app/general/verification.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-coleccionesp',
  templateUrl: './coleccionesp.component.html',
  styleUrls: ['./coleccionesp.component.css']
})
export class ColeccionespComponent implements OnInit {

  colecciones : Map<string, string[]> = new Map();
  verification : VerificationService;
  _ce : ColeccionespService;
  page_number : number = 1;
  listaUsuario : string[] = [];
  activeCollection : string = "DIY";
  listaObjetos : Array<any> = new Array<any>();
  selected = {
    'border-width': '0.4vw'
  };
  base = {
    'border-width': ''
  }

  @ViewChild("atras") atras : ElementRef;
  @ViewChild("alante") alante : ElementRef;

  constructor(verification : VerificationService, ce : ColeccionespService) {
    this.verification = verification;
    this._ce = ce;
  }

  ngOnInit(){
    this.verification.verify().then(async() => {
      this.colecciones = this._ce.colecciones;

      let tempItems : Array<IItem> = new Array<IItem>();
      let tempRecipes : Array<IRecipe> = new Array<IRecipe>();

      //Obtenemos todos los sources asociados a la colección activa y filtramos la lista de items para que solo
      //se quede con aquellos cuya source es minimo uno de los de la CE activa
      tempItems = await items.filter(i => i.source != undefined && i.source.some(s => this.colecciones.get(this.activeCollection).includes(s)));
      tempRecipes = await recipes.filter(i => i.source.some(s => this.colecciones.get(this.activeCollection).includes(s)));
      //Con los items tenemos que comprobar que la source no sea undefined ya que contiene items, como papel de carta,
      //que no dispone de source y por lo tanto siempre devolvera undefined

      this.listaObjetos = [].concat(tempItems, tempRecipes).sort();

      if(this.listaObjetos.length <= 16){
        this.alante.nativeElement.style.visibility = "hidden";
      }

      // Leemos los objetos del usuario por colección activa
      this._ce.readCE().then(data => {
        //Esto es para que solo coja la coleccion activa
        let index : number = null;
        for(let i = 0; i < data.length; i++){
          if(data[i]["item_source"] == this.activeCollection){
            index = i;
            break;
          }
        }

        if(index != null){
          let s : string = data[index]["GROUP_CONCAT(item_name)"];
          this.listaUsuario = s.split(",");
        }

        //console.log(items.filter(i => i.source != undefined && i.source.some(s => this.colecciones.get("Caza").includes(s))));
      });
    });
  }

  setActiveCollection(lista : string){
    this.activeCollection = lista;
    this.page_number = 1;
    //Aunque funciona bien, hay un frame que se muestra la pag 1 antes de que se haga oninit
    this.atras.nativeElement.style.visibility = "hidden";
    this.alante.nativeElement.style.visibility = "visible";
    this.ngOnInit();
  }

  paginacionNavigation(action : string){
    if(action == "atras" && this.page_number > 1){
      --this.page_number;
    }else if(action == "alante" && this.page_number * 16 < this.listaObjetos.length){ //TODO
      ++this.page_number;
    }

    if(this.page_number > 1 && this.page_number * 16 < this.listaObjetos.length){ //TODO
      this.atras.nativeElement.style.visibility = "visible";
      this.alante.nativeElement.style.visibility = "visible";
    }else if(this.page_number > 1){
      this.atras.nativeElement.style.visibility = "visible";
      this.alante.nativeElement.style.visibility = "hidden";
    }else{
      this.atras.nativeElement.style.visibility = "hidden";
      this.alante.nativeElement.style.visibility = "visible";
    }
  }

  toggleCheck(item : any){
    if(this.listaUsuario.includes(item.name)){
      this._ce.borrarItemCE(item.name).then(() => {
        this.ngOnInit();
      });
    }else{
      this._ce.addItemCE(item, this.activeCollection).then(() => {
        this.ngOnInit();
      });
    }
  }

  checkTieneItem(res : boolean){
    let result : string;

    if(res){
      result = "url('../../../assets/images/check-rojo.png')";
    }else{
      result = "url('../../../assets/images/check-gris.png')";
    }
    return result;
  }
}
