import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitasemanal',
  templateUrl: './visitasemanal.component.html',
  styleUrls: ['./visitasemanal.component.css']
})
export class VisitasemanalComponent implements OnInit {

  constructor() { }
  active = "none";
  coord = null;

  lpa = "totakeke";
  mpa = null;
  xpa = null;
  jpa = null;
  vpa = null;
  spa = null;
  dpa = null;

  lpr = null;
  mpr = null;
  xpr = null;
  jpr = null;
  vpr = null;
  spr = null;
  dpr = null;
  ngOnInit(): void {
  }
  vacio(event, datos:string){
    console.log(datos);
    if(this.active=="none"){
      this.active="block";
    }else{
      this.active="none";
    }
  }
  obtenPosicion(event): any[]{
    let x = (event.target.offsetLeft / window.innerWidth) * 100;
    let y = ((event.target.offsetTop + event.target.offsetHeight) / window.innerHeight ) * 100;
    return [x, y];
  }
}
