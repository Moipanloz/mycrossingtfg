import { ErrorService } from './../general/services/error.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { VerificationService } from 'app/general/services/verification.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  verification: VerificationService;
  cookieService: CookieService;
  _error : ErrorService;

  constructor(cookieService: CookieService, verification: VerificationService, errorService : ErrorService) {
    this.verification = verification;
    this.cookieService = cookieService;
    this._error = errorService;
  }
  imagen: number;

  ngOnInit(): void {
    if(!this.verification.verified){
      this.verification.verify().then().catch(err => {
        this._error.setNewError(err.message);
        setTimeout(() => {this._error.cleanError()}, 3000)
      });
    }
  }
}
