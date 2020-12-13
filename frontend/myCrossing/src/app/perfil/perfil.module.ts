import { PerfilComponent } from './perfil.component';
import { MisvecinosComponent } from './misvecinos/misvecinos.component';
import { ColeccionespComponent } from './coleccionesp/coleccionesp.component';
import { VisitasemanalComponent } from './visitasemanal/visitasemanal.component';
import { TareasComponent } from './tareas/tareas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PerfilComponent,
    TareasComponent,
    VisitasemanalComponent,
    ColeccionespComponent,
    MisvecinosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PerfilModule { }
