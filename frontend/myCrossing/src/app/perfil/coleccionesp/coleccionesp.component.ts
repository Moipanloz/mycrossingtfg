import { ColeccionespService } from './coleccionesp.service';
import { VerificationService } from 'app/general/verification.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemsCEService } from './itemsce.service';

@Component({
  selector: 'app-coleccionesp',
  templateUrl: './coleccionesp.component.html',
  styleUrls: ['./coleccionesp.component.css']
})
export class ColeccionespComponent implements OnInit {

  colecciones : string[] = [];
  verification : VerificationService;
  _ce : ColeccionespService;
  _ceinv : ItemsCEService;
  page_number : number = 1;
  listaUsuario : string[] = [];
  inventario : string[] = [];
  activeCollection : string = "DIY";
  selected = {
    'border-width': '0.4vw'
  };
  base = {
    'border-width': ''
  }

  @ViewChild("atras") atras : ElementRef;
  @ViewChild("alante") alante : ElementRef;

  constructor(verification : VerificationService, ce : ColeccionespService, ceinv : ItemsCEService ) {
    this.verification = verification;
    this._ce = ce;
    this._ceinv = ceinv;
  }

  ngOnInit(){
    this.verification.verify().then(() => {
      this.colecciones = this._ceinv.colecciones;

      this._ceinv.readItemsCE().then(inv => {
        let index : number = 0;
        for(let i = 0; i < this._ceinv.colecciones.length; i++){
          if(inv[i]["source"] == this.activeCollection){
            index = i;
            break;
          }
        }
        let s : string = inv[index]["GROUP_CONCAT(id)"];
        this.inventario = s.split(",");
        this.inventario.sort();
      });

      this._ce.readCE().then(data => {
        let index : number = null;
        for(let i = 0; i < data.length; i++){
          if(data[i]["source"] == this.activeCollection){
            index = i;
            break;
          }
        }

        if(index != null){
          let s : string = data[index]["GROUP_CONCAT(usuariosce.itemce_id)"];
          this.listaUsuario = s.split(",");
        }
      });

    });
  }

  setActiveCollection(lista : string){
    this.activeCollection = lista;
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

}
