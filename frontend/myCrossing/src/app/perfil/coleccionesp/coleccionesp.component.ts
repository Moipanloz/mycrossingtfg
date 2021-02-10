import { ColeccionespService } from './coleccionesp.service';
import { VerificationService } from 'app/general/verification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coleccionesp',
  templateUrl: './coleccionesp.component.html',
  styleUrls: ['./coleccionesp.component.css']
})
export class ColeccionespComponent implements OnInit {

  colecciones : string[] = [
    "DIY",
    "Estacional",
    "Estela",
    "Caza",
    "Pesca",
    "Gulliver",
    "Gullivarr",
    "Coti",
    "Soponcio",
    "Copito",
    "Renato",
    "Conga"
  ];

  verification : VerificationService;
  _ce : ColeccionespService;
  page_number : number = 1;

  constructor(verification : VerificationService, ce : ColeccionespService ) {
    this.verification = verification;
    this._ce = ce;
  }

  ngOnInit(){
    this.verification.verify();
  }

  pagAtras(){
    if(this.page_number > 1) {
      --this.page_number;
    }
  }

  pagAlante(){
    if(this.page_number * 16 < this.DIY.length) {
      ++this.page_number;
    }
  }

  toggleCheck(){
    let placeholder1 : string = "";
    let placeholder2 : string[] = [];
    this._ce.updateCE(placeholder1, placeholder2).then(() => {
      //TODO
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
    "d24"
  ];


}
