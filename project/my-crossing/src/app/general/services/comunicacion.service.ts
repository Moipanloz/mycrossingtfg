import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  datos : string[];
  activar : boolean = false;
  constructor() {
    if(this.datos==null) this.datos=[];
  }
  buscaDato(dato:string):string{
    let res : string;
    this.datos.forEach(d=>{if(d.includes(dato)){res=d;}});
    return res;
  }
  eliminaDato(dato:string){
    this.datos = this.datos.filter(d=>!d.includes(dato));
  }
}
