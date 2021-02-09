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

  constructor(verification : VerificationService) {
    this.verification = verification;
  }

  ngOnInit(){
    this.verification.verify();
  }

  pagAtras(){}

  pagAlante(){}



}
