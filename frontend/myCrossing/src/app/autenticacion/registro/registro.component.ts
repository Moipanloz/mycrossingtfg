import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Verification } from '../../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {EncriptionService} from '../encription.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  verification: Verification;
  registerForm: FormGroup;
  cookieService: CookieService;
  aviso: String = "";
  submitted: Boolean = false;
  constructor(private encriptionService:EncriptionService, private router:Router, cookieService: CookieService, verification: Verification, private http: HttpClient, private _builder: FormBuilder) {
    this.verification = verification;
    this.cookieService = cookieService;
    this.registerForm = this._builder.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      isla: ['', Validators.required],
      fruta: ['PERA', Validators.required],
      cumpleanyos: ['', Validators.required],
      hemisferio: ['NORTE', Validators.required],
      id_switch: ['', Validators.compose([Validators.maxLength(17), Validators.minLength(17), CustomValidator.switch])],
      id_suenyo: ['', Validators.compose([Validators.maxLength(17), Validators.minLength(17), CustomValidator.dream])],
      apodo_aldeano: ['', ]
    })
  }
  ngOnInit(): void {
  }
  async register(form){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    let data = Array();
    let key = this.verification.makeRandomKey();
    let parametros = new HttpParams().set("command", "register");
    let user = this.registerForm.value;
    user.verif = key;
    user.clave = this.encriptionService.encript(user.clave);
    data.push(await this.http.post("http://localhost/authentication.php", user, {params: parametros}).toPromise());
    this.cookieService.set( 'verif', key );
    this.cookieService.set( 'userId', data[0][0]['id'] );
    this.verification.verified = true;
    this.verification.logged = true;
    this.verification.user = data[0][0]['id'];
    this.router.navigate(['']);
  }
}
export class CustomValidator{
  static switch(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^SW-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) return { 'invalidSwitch': true };

    return null;
  }
  static dream(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) return { 'invalidDream': true };

    return null;
  }
}