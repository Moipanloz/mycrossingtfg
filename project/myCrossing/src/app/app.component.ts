import { VerificationService } from 'app/general/services/verification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'My Crossing';
  verification : VerificationService;
  esconder : boolean = true;
  //PONER VACIO
  errMssg : string = "Error de prueba";

  constructor(){}

  ngOnInit(){
    this.esconder = true;
    this.errMssg = "";
  }

  showNewError(mssg : string){
    this.esconder = false;
    this.errMssg = mssg;

    //Esperar unos segundos
    //this.ngOnInit();
  }
}
