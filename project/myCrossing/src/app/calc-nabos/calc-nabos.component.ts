import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import analyze from 'ac-stalk-market-analyzer';

@Component({
  selector: 'app-calc-nabos',
  templateUrl: './calc-nabos.component.html',
  styleUrls: ['./calc-nabos.component.css']
})
export class CalcNabosComponent implements OnInit {

  filtrosView : boolean[] = [false, false, false, false];

  precios : Array<number> = [95,95,100,130,110,0,0,0,0,0,0,0,0,0];

  constructor() { }

  ngOnInit(): void {
    const prices = [73, 72, 69, 80, 92, 112, 98, 95, 35, 32, 20, 17];
    const pattern = analyze(this.precios);
    console.log(pattern);
  }

  pito(){
    console.log('pito')
  }
}
