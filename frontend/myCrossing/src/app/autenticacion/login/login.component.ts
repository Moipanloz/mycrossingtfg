import { UserService } from 'app/autenticacion/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Verification } from '../../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncriptionService } from '../encription.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  aviso: String = "";
  cookieService: CookieService;
  verification: Verification;
  loginForm: FormGroup;
  submitted: boolean = false;
  _user: UserService;
  constructor(private encriptionService:EncriptionService, cookieService: CookieService,
     verification: Verification, private _builder: FormBuilder, private http: HttpClient,
      private router:Router, _user : UserService) {
    this.cookieService = cookieService;
    this.verification = verification;
    this._user = _user;
    this.loginForm = this._builder.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required]
    })
  }

  async login(form){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this._user.login().then(datos => {
      for (let user of datos){
        if(user['nombre']==form.value['nombre'] && this.encriptionService.decript(user['contrasenya'])==form.value['clave']){
          this.verification.logged=true;
          this.verification.user=user['id'];
          break;
        }
      }

      if(this.verification.logged == true){
        let key: string = this.verification.makeRandomKey();

        this._user.setKey(key).then(res => {
          if(JSON.stringify(res)=="[\"Error\"]"){
            this.aviso = "El usuario al que intenta acceder está corrupto, contacte con un administrador";
          }else{
            this.cookieService.set( 'verif', key );
            this.cookieService.set( 'userId', this.verification.user.toString() );

            this.verification.verified = true;
            this.router.navigate(['']);
          }
        });
      }else{
        this.aviso = "El usuario no existe o la contraseña no es correcta";
      }
    });

  }
}
