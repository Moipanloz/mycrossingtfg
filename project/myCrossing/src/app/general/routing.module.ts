import { CatArteComponent } from './../cat-arte/cat-arte.component';
import { CatFosilComponent } from './../cat-fosil/cat-fosil.component';
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
import { CatInsectosComponent } from 'app/cat-insectos/cat-insectos.component';

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
},{
  path: "catalogo-fosiles",
  component: CatFosilComponent
},{
  path: "catalogo-arte",
  component: CatArteComponent
},{
  path: "catalogo-insectos",
  component: CatInsectosComponent
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
