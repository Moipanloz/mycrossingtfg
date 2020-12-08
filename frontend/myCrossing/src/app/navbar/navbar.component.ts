import { UsuarioModule } from './../usuario/usuario.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor() { }

  usuario : UsuarioModule;



}
