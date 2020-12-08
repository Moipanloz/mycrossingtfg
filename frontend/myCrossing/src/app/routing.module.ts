import { RegistroComponent } from './autenticacion/registro/registro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { InicioComponent } from './inicio/inicio.component';

const rutas: Routes = [
{
  path: "",
  component: InicioComponent
},{
  path: "prueba",
  component: PruebaComponent
},{
  path: "inicia-sesion",
  component: LoginComponent
},{
  path: "registro",
  component: RegistroComponent
}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(rutas),
    CommonModule
  ]
})

export class RoutingModule { }
