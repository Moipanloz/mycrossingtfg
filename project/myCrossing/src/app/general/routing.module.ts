import { CatMuebleComponent } from './../cat-mueble/cat-mueble.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { RegistroComponent } from '../autenticacion/registro/registro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../autenticacion/login/login.component';
import { InicioComponent } from '../inicio/inicio.component';
import { AuthGuard } from '../autenticacion/auth.guard';
import { CatRopaComponent } from 'app/cat-ropa/cat-ropa.component';

const rutas: Routes = [
{
  path: "",
  component: InicioComponent
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
},{
  path: "catalogo-ropa",
  component: CatRopaComponent
},{
  path: "catalogo-muebles",
  component: CatMuebleComponent
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
