import { UserService } from 'app/autenticacion/user.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncriptionService } from '../encription.service'
import { VerificationService } from 'app/general/verification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  aviso: String = "";
  cookieService: CookieService;
  verification: VerificationService;
  loginForm: FormGroup;
  submitted: boolean = false;
  _user: UserService;

  constructor(private encriptionService:EncriptionService, cookieService: CookieService,
     verification: VerificationService, private _builder: FormBuilder, private http: HttpClient,
      private router:Router, _user : UserService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
    this.loginForm = this._builder.group({
      email: ['', Validators.required],
      clave: ['', Validators.required]
    })
  }

  login(form){
    this.submitted = true;
    if(!this.loginForm.invalid){

      let key: string = this.verification.makeRandomKey();
      let user : any = this.loginForm.value;

      this._user.login(user, key).then( data => {
        //Si existe el usuario y la contraseña es correcta, se habrá actualizado el codigo de verificacion
        //con el enviaddo, por lo que si coincide, la operación habrá sido exitosa
        if(data['verification'] == key){
          this.verification.logged=true;
          this.verification.user=data['id'];
          this.verification.nombre = data["nombre"];
          this.verification.verifCode = data["verification"];

          this.cookieService.set('verif', key );
          this.cookieService.set('userId', this.verification.user.toString());
          this.verification.verified = true;
          this.router.navigate(['']);
        }else{
          this.aviso = "El usuario no existe o la contraseña no es correcta";
        }
      });
    }
  }
}
