import { IItem, IRecipe, items, recipes } from 'animal-crossing';
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
  inventario : Array<string> = new Array<string>();
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
    this.verification.verify().then(() => {
      this.colecciones = this._ce.colecciones;

      let tempItems : Array<IItem> = new Array<IItem>();
      let tempRecipes : Array<IRecipe> = new Array<IRecipe>();

      //Obtenemos todos los sources asociados a la colección activa y filtramos la lista de items para que solo
      //se quede con aquellos cuya source es minimo uno de los de la CE activa
      tempItems = items.filter(i => i.source != undefined && i.source.some(s => this.colecciones.get(this.activeCollection).includes(s)));
      tempRecipes = recipes.filter(i => i.source.some(s => this.colecciones.get(this.activeCollection).includes(s)));
      //Con los items tenemos que comprobar que la source no sea undefined ya que contiene items, como papel de carta,
      //que no dispone de source y por lo tanto siempre devolvera undefined

      this.listaObjetos.concat(tempItems, tempRecipes).sort();

      if(this.listaObjetos.length <= 16){
        this.alante.nativeElement.style.visibility = "hidden";
      }

      // Leemos los objetos del usuario por colección activa
      this._ce.readCE().then(data => {
        //Esto es para que solo coja la coleccion activa, descomentar si falla lo otro

        // let index : number = null;
        // for(let i = 0; i < data.length; i++){
        //   if(data[i]["source"] == this.activeCollection){
        //     index = i;
        //     break;
        //   }
        // }

        let index : number = Object.keys(data).indexOf(this.activeCollection);

        if(index != null){
          let s : string = data[index]["GROUP_CONCAT(usuariosce.itemce_id)"];
          this.listaUsuario = s.split(",");
        }
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
    }else if(action == "alante" && this.page_number * 16 < this.inventario.length){ //TODO
      ++this.page_number;
    }

    if(this.page_number > 1 && this.page_number * 16 < this.inventario.length){ //TODO
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

  toggleCheck(item : string){
    if(this.listaUsuario.includes(item)){
      this._ce.borrarItemCE(item).then(() => {
        this.ngOnInit();
      });
    }else{
      this._ce.addItemCE(item).then(() => {
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
