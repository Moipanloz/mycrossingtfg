import { ErrorService } from './../../general/services/error.service';
import { PaginacionService } from './../../general/services/paginacion.service';
import { IItem, IRecipe, items, recipes } from 'animal-crossing';
import { ColeccionespService } from './coleccionesp.service';
import { VerificationService } from 'app/general/services/verification.service';
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
  activeCollection : string = "Boda";
  page_max : number = 0;
  max_items : number = 16;
  _error : ErrorService;
  listaObjetos : Array<any> = new Array<any>();
  selected = {
    'border-width': '0.4vw'
  };
  base = {
    'border-width': ''
  }

  @ViewChild("atras") atras : ElementRef;
  @ViewChild("alante") alante : ElementRef;

  constructor(verification : VerificationService, ce : ColeccionespService, public _pag : PaginacionService, errorService : ErrorService) {
    this.verification = verification;
    this._ce = ce;
    this._error = errorService;
  }

  ngOnInit(){
    this.verification.verify().then(async() => {
      this.colecciones = this._ce.colecciones;

      let tempItems : Array<IItem> = new Array<IItem>();
      let tempRecipes : Array<IRecipe> = new Array<IRecipe>();

      //Obtenemos todos los sources asociados a la colección activa y filtramos la lista de items para que solo
      //se quede con aquellos cuya source es minimo uno de los de la CE activa
      tempItems = await items.filter(i => i.source != undefined && i.source.some(s => this.colecciones.get(this.activeCollection).includes(s)));
      if(this.activeCollection == "DIY"){ //Para los DIY cogemos los que no cumplan ningun source
        let sources = new Array<string>();
        this.colecciones.forEach(async c => {
          for(let o = 0; o < c.length; o++){
            sources.push(c[o]);
          }
        });

        tempRecipes = await recipes.filter(r => !r.source.some(s => sources.includes(s)) &&
        !sources.some(s => r.seasonEvent != null ? r.seasonEvent.includes(s) : ""));

      }else{
        tempRecipes = await recipes.filter(i => i.source.some(s => this.colecciones.get(this.activeCollection).includes(s)) ||
        (i.seasonEvent != null && this.colecciones.get(this.activeCollection).some(s => i.seasonEvent.includes(s))));
      }

      tempRecipes.sort(function(a,b){
        if(a.seasonEvent > b.seasonEvent){
          return 1;
        }else if(a.seasonEvent < b.seasonEvent){
          return -1;
        }else{
          return 0;
        }
      });
      //Con los items tenemos que comprobar que la source no sea undefined ya que contiene items, como papel de carta,
      //que no dispone de source y por lo tanto siempre devolvera undefined

      this.listaObjetos = [].concat(tempItems, tempRecipes);


      //==========================EXCLUSIONES==========================//
      if(this.activeCollection == "Boda"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "heart crystal")), 1); //Eliminar la bolsa de regalos
      }else if(this.activeCollection == "Renato"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "magic bag")), 1); //Eliminar la bolsa de regalos
      }else if(this.activeCollection == "Caza" || this.activeCollection == "Pesca"){ //Elimnar las estatuas de peces y bichos
        let listaTemp = new Array<any>();
        this.listaObjetos.forEach(p => {
          if(!p.name.includes("model")){ //No se puede hacer con split porque estas recorriendo la misma lista
            listaTemp.push(p);
          }
        });
        this.listaObjetos = listaTemp.sort();
      }else if(this.activeCollection == "Copito"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "large snowflake")), 1); //Eliminar el copo XL
      }else if(this.activeCollection == "Coti"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "sky egg")), 1); //Eliminar los huevos
      }else if(this.activeCollection == "Estacional"){
        let listaTemp = new Array<any>();
        this.listaObjetos.forEach(p => {
          if(!p.source.includes("Snowboy")){ //Hacer que no se repitan los de copito
            listaTemp.push(p);
          }
        });
        this.listaObjetos = listaTemp.sort();
      }else if(this.activeCollection == "Guindo"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "Cozy Turkey Day DIY")), 1); //Eliminar el set DIY
        this.listaObjetos = this.listaObjetos.filter(i => i.sourceSheet != "Recipes"); // Ademas solo nos quedamos con los que no sean recetas para no duplicado
        console.log(this.listaObjetos)
      }else if(this.activeCollection == "Mama"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "Mom's lively kitchen mat")), 1); //Hacer que solo se muestre 1 alfombra
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "Mom's playful kitchen mat")), 1);
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "Mom's reliable kitchen mat")), 1);
      }else if(this.activeCollection == "Pascal"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "pearl")), 1); //Eliminar la perla
      }else if(this.activeCollection == "Soponcio"){
        this.listaObjetos.splice(this.listaObjetos.indexOf(items.find(i => i.name == "spooky carriage")), 1); //Eliminar el item carruaje (salia el item y el diy)
      }else if(this.activeCollection == "DIY"){
        let listaTemp = new Array<any>();
        this.listaObjetos.forEach(p => {
          if(!p.name.includes("construction kit")){ //Eliminar los kits de sconstruccion de Tom Nook
            listaTemp.push(p);
          }
        });
        this.listaObjetos = listaTemp.sort();      }

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
      }).catch(err => {
        this._error.setNewError(err.message);
        setTimeout(() => {this._error.cleanError()}, 3000)
      });
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });

    this.page_max = this.listaObjetos.length / 16;
  }

  setActiveCollection(lista : string){
    this.activeCollection = lista;
    this.page_number = 1;
    //Aunque funciona bien, hay un frame que se muestra la pag 1 antes de que se haga oninit
    this.atras.nativeElement.style.visibility = "hidden";
    this.alante.nativeElement.style.visibility = "visible";
    this.ngOnInit();
  }

  toggleCheck(item : any){
    if(this.listaUsuario.includes(item.name)){
      this._ce.borrarItemCE(item.name).then(() => {
        this.ngOnInit();
      }).catch(err => {
        this._error.setNewError(err.message);
        setTimeout(() => {this._error.cleanError()}, 3000)
      });
    }else{
      this._ce.addItemCE(item, this.activeCollection).then(() => {
        this.ngOnInit();
      }).catch(err => {
        this._error.setNewError(err.message);
        setTimeout(() => {this._error.cleanError()}, 3000)
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

  getImage(item : any){
    let img : string = item.image; //Imagen base - valida para mueble o receta
    if(item["variations"] == null || item["variations"] == undefined){ //No tiene variaciones
      if (img == null || img == ""){  //Es ropa o tool
        img = item.storageImage; //Imagen de item (ropa o tool)
      }
    }else{ //Tiene variaciones
      let itemVar = item["variations"][0];
      if(itemVar.image == null || itemVar.image == ""){ //Es ropa
        img = itemVar.storageImage;
      }else{
        img = itemVar.image; //Es mueble
      }
    }
    return img;
  }
}
