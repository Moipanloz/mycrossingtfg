import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data = [];
  aviso: String = "";
  globals: AppConstants;
  loginForm: FormGroup;
  constructor(appConstants: AppConstants, private _builder: FormBuilder, private http: HttpClient, private router:Router) {
    this.globals = appConstants;
    this.loginForm = this._builder.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    })
  }
  async login(form){

    this.http.get("http://localhost/login.php").subscribe(data => {
      this.data = [];
      this.data = this.data.concat(data);
    },error => console.error(error));
    await delay(300);
    for (let user of this.data){
      if(user['nombre']==form.value['usuario'] && user['contrasenya']==form.value['clave']){
        this.globals.logged=true;
        this.globals.user=user['id'];
      }
    }
    if(this.globals.logged == true){
      this.router.navigate(['']);
    }else{
      this.aviso = "El usuario no existe o la contraseña no es correcta";
    }
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  }
}
