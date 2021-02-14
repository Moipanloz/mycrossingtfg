import { ColeccionespService } from './coleccionesp.service';
import { VerificationService } from 'app/general/verification.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColeccionesEspInvService } from './coleccionesespinv.service';

@Component({
  selector: 'app-coleccionesp',
  templateUrl: './coleccionesp.component.html',
  styleUrls: ['./coleccionesp.component.css']
})
export class ColeccionespComponent implements OnInit {

  colecciones : string[] = [];
  verification : VerificationService;
  _ce : ColeccionespService;
  _ceinv : ColeccionesEspInvService;
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

  constructor(verification : VerificationService, ce : ColeccionespService, ceinv : ColeccionesEspInvService ) {
    this.verification = verification;
    this._ce = ce;
    this._ceinv = ceinv;
  }

  ngOnInit(){
    this.verification.verify().then(() => {
      this.colecciones = this._ceinv.colecciones;

      this._ceinv.readCEInv().then(inv => {
        let index : number = 0;
        for(let i = 0; i < this._ceinv.colecciones.length; i++){
          if(inv[i]["source"] == this.activeCollection){
            index = i;
            break;
          }
        }
        let s : string = inv[index]["items"];
        this.inventario = s.split(",");
      });

      this._ce.readCE().then(data => {
        let index : number = 0;
        for(let i = 0; i < this._ceinv.colecciones.length; i++){
          if(data[i]["source"] == this.activeCollection){
            index = i;
            break;
          }
        }

        if(data[index]["items"] == null){
          this.listaUsuario = [""];
        }else{
          let s : string = data[index]["items"];
          this.listaUsuario = s.split(",");
        }
      });

      this.activeCollection
    });
  }

  setActiveCollection(lista : string){
    this.activeCollection = lista; //esto creo que es pa filtrar
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
    this._ce.updateCE(item, this.activeCollection, this.listaUsuario).then(() => {
      this.ngOnInit();
      //TODO?
    });
  }


  //===================================TEST===============================
  estela : string[] = [
    "e1",
    "e2",
    "e3",
    "e4",
    "e5",
    "e6",
    "e7",
    "e8",
    "e9",
    "e10",
    "e11",
    "e12"
  ];

  gulliver : string[] = [
    "g1",
    "g2",
    "g3",
    "g4",
    "g5",
    "g6",
    "g7",
    "g8",
    "g9",
    "g10"
  ];

  DIY : string[] = [
    "d1",
    "d2",
    "d3",
    "d4",
    "d5",
    "d6",
    "d7",
    "d8",
    "d9",
    "d10",
    "d11",
    "d12",
    "d13",
    "d14",
    "d15",
    "d16",
    "d17",
    "d18",
    "d19",
    "d20",
    "d21",
    "d22",
    "d23",
    "d24",
    "d25",
    "d26",
    "d27",
    "d28",
    "d29",
    "d30",
    "d31",
    "d32",
    "d33",
    "d34",
    "d35",
    "d36",
    "d37",
    "d38",
    "d39",
    "d40"
  ];


}
