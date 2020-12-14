import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './autenticacion/auth.guard';

const rutas: Routes = [
{
  path: "",
  component: InicioComponent
},{
  path: "prueba",
  component: PruebaComponent
},{
  path: "inicia-sesion",
  component: LoginComponent,
  canActivate: [AuthGuard]
},{
  path: "registro",
  component: RegistroComponent,
  canActivate: [AuthGuard]
},{
  path: "perfil",
  component: PerfilComponent,
  canActivate: [AuthGuard]
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
