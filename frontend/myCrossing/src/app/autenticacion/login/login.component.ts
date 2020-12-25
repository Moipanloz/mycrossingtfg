import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Verification } from '../../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(){
    if(this.verification.logged != null && this.verification.logged){
      this.router.navigate(['']);
    }
  }
  aviso: String = "";
  cookieService: CookieService;
  verification: Verification;
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(cookieService: CookieService, verification: Verification, private _builder: FormBuilder, private http: HttpClient, private router:Router) {
    this.cookieService = cookieService;
    this.verification = verification;
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
    let data = Array();
    let parametros = new HttpParams().set("command", "login");
    data.push(await this.http.get("http://localhost/authentication.php", {params: parametros}).toPromise());
    let datos = data.reduce((acc, val) => acc.concat(val), []);
    for (let user of datos){
      if(user['nombre']==form.value['nombre'] && user['contrasenya']==form.value['clave']){
        this.verification.logged=true;
        this.verification.user=user['id'];
        break;
      }
    }
    if(this.verification.logged == true){
      let key: string = this.verification.makeRandomKey();
      let parametros = new HttpParams().set("userId", JSON.stringify(this.verification.user)).set("command", "setKey").set("key", key);
      this.http.get("http://localhost/authentication.php", {params: parametros}).toPromise();
      this.cookieService.set( 'verif', key );
      this.cookieService.set( 'userId', this.verification.user.toString() );
      this.verification.verified = true;
      this.router.navigate(['']);
    }else{
      this.aviso = "El usuario no existe o la contraseña no es correcta";
    }
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  }
}
