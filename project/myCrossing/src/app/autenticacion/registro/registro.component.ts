import { ErrorService } from './../../general/services/error.service';
import { ColeccionespService } from './../../perfil/coleccionesp/coleccionesp.service';
import { UserService } from 'app/autenticacion/user.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { VerificationService } from 'app/general/services/verification.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  verification: VerificationService;
  registerForm: FormGroup;
  cookieService: CookieService;
  _user : UserService;
  aviso: String = "";
  submitted: Boolean = false;
  _ce :  ColeccionespService;
  _error : ErrorService;

  constructor(
    private router:Router,
    cookieService: CookieService,
    verification: VerificationService,
    private _builder: FormBuilder,
    _user: UserService,
    _ce :  ColeccionespService,
    errorService : ErrorService) {

    this.verification = verification;
    this.cookieService = cookieService;
    this._user = _user;
    this._ce = _ce;
    this._error = errorService;
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

  async register(form){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    let user = this.registerForm.value;
    let key = this.verification.makeRandomKey();

    this._user.register(user, key).then(data => {
      this.cookieService.set( 'verif', key );
      this.cookieService.set( 'userId', data[0]['id'] );
      this.verification.verified = true;
      this.verification.logged = true;
      this.verification.user = data[0]['id'];
      this.verification.nombre = data[0]["nombre"];
      this.verification.verifCode = key;
      this.router.navigate(['']);
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });;
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
