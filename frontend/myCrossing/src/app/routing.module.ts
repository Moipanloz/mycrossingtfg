import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';

const rutas: Routes = [
{
  path: "prueba",
  component: PruebaComponent
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
