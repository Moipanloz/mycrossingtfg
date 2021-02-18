import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitasemanal',
  templateUrl: './visitasemanal.component.html',
  styleUrls: ['./visitasemanal.component.css']
})
export class VisitasemanalComponent implements OnInit {

  constructor() { }
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
  vacio(datos:string){
    console.log(datos);
  }
}
