import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitasemanal',
  templateUrl: './visitasemanal.component.html',
  styleUrls: ['./visitasemanal.component.css']
})
export class VisitasemanalComponent implements OnInit {

  constructor() { }
  hide :boolean = true;
  top = 300;
  left = 300;

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
  vacio(event: any, datos:string){
    let coord = this.obtenPosicion(event);
    this.top = coord[1]*6;
    this.left = coord[0]*7;
    console.log(coord);
    if(this.hide==false){
      this.hide=true;
    }else{
      this.hide=false;
    }
  }
  obtenPosicion(event): any[]{
    let x = (event.target.offsetLeft / window.innerWidth) * 100;
    let y = ((event.target.offsetTop + event.target.offsetHeight) / window.innerHeight ) * 100;
    return [x, y];
  }
}
