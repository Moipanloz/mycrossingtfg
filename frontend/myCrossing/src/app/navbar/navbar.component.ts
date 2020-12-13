import { UsuarioModule } from './../usuario/usuario.module';
import { Component } from '@angular/core';
import { AppConstants } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  globals: AppConstants;

  constructor(appConstants: AppConstants) {this.globals = appConstants;}

  usuario : UsuarioModule;



}
