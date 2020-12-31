import { Verification } from './../app.component';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  verification : Verification;
  cookieService: CookieService;

  constructor(verification : Verification) {
    this.verification = verification;
   }

  ngOnInit() {
    this.verification.verifyIfNotVerified();
  }

}
