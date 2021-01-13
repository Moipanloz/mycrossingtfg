import { Component, OnInit } from '@angular/core';
import { Verification } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'app/interfaces';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  verification : Verification;
  cookieService: CookieService;
  usuario : User;

  constructor(
    verification : Verification,
    cookieService: CookieService) {
      this.verification = verification;
      this.cookieService = cookieService;
    }

    ngOnInit(){
      // Hacer un get usuario logueado
    }

}
