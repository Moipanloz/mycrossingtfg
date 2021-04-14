import { CalEventosComponent } from './../cal-eventos/cal-eventos.component';
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
import { CatPecesComponent } from 'app/cat-peces/cat-peces.component';
import { CatCriaturasMarinasComponent } from 'app/cat-criaturas-marinas/cat-criaturas-marinas.component';
import { CatCazaInsectosComponent } from 'app/cazar-ahora/cat-caza-insectos/cat-caza-insectos.component';
import { CatCazaPecesComponent } from 'app/cazar-ahora/cat-caza-peces/cat-caza-peces.component';
import { CatCazaCriaturasMarinasComponent } from 'app/cazar-ahora/cat-caza-criaturas-marinas/cat-caza-criaturas-marinas.component';
import { CatVecinosComponent } from 'app/cat-vecinos/cat-vecinos.component';
import { CalcNabosComponent } from 'app/calc-nabos/calc-nabos.component';

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
},{
  path: "catalogo-peces",
  component: CatPecesComponent
},{
  path: "catalogo-criaturas-marinas",
  component: CatCriaturasMarinasComponent
},{
  path: "cat-caza-insectos",
  component: CatCazaInsectosComponent
},{
  path: "cat-caza-peces",
  component: CatCazaPecesComponent
},{
  path: "cat-caza-criaturas-marinas",
  component: CatCazaCriaturasMarinasComponent
},{
  path: "catalogo-vecinos",
  component: CatVecinosComponent
},{
  path: "mercado-nabos",
  component: CalcNabosComponent
},{
  path: "calendario",
  component: CalEventosComponent
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
