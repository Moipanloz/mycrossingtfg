import { ErrorService } from './general/services/error.service';
import { VerificationService } from 'app/general/services/verification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My Crossing';
  verification : VerificationService;
  esconder : boolean;
  errMssg : string;

  constructor(errorService : ErrorService){
    console.log("construyendo app")
    console.log(errorService.mensaje);
    console.log(this.errMssg);
    errorService.errorMssgChange.subscribe(mesj => mesj);
    this.errMssg = errorService.mensaje;
    this.esconder = errorService.esconder;
    console.log(this.errMssg);

  }
}
