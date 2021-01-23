import { PerfilComponent } from './perfil.component';
import { MisvecinosComponent } from './misvecinos/misvecinos.component';
import { ColeccionespComponent } from './coleccionesp/coleccionesp.component';
import { VisitasemanalComponent } from './visitasemanal/visitasemanal.component';
import { TareasComponent } from './tareas/tareas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaMenuComponent } from './tareas/tarea-menu/tarea-menu.component';
import { ClickOutsideDirective } from 'app/general/clickOutside.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { VecinoMenuComponent } from './misvecinos/vecino-menu/vecino-menu.component';


@NgModule({
  declarations: [
    PerfilComponent,
    TareasComponent,
    VisitasemanalComponent,
    ColeccionespComponent,
    MisvecinosComponent,
    TareaMenuComponent,
    ClickOutsideDirective,
    VecinoMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})

export class PerfilModule { }
