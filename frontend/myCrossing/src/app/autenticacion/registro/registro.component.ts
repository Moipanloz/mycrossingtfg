import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Verification } from '../../app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  verification: Verification;
  registerForm: FormGroup;
  aviso: String = "";
  constructor(verification: Verification, private _builder: FormBuilder) {
    this.verification = verification;
    this.registerForm = this._builder.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      email: ['', Validators.required],
      isla: ['', Validators.required],
      fruta: ['PERA', Validators.required],
      cumpleanyos: ['', Validators.required],
      hemisferio: ['NORTE', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  register(form){

  }
}
