import { FiltroVecinoPipe } from './misvecinos/vecino-menu/filtro-vecino.pipe';
import { SharingModule } from './../general/sharing.module';
import { PerfilComponent } from './perfil.component';
import { MisvecinosComponent } from './misvecinos/misvecinos.component';
import { ColeccionespComponent } from './coleccionesp/coleccionesp.component';
import { VisitasemanalComponent } from './visitasemanal/visitasemanal.component';
import { TareasComponent } from './tareas/tareas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaMenuComponent } from './tareas/tarea-menu/tarea-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VecinoMenuComponent } from './misvecinos/vecino-menu/vecino-menu.component';
import { CookieService } from 'ngx-cookie-service';
import { VecinosPipe } from './misvecinos/vecinos.pipe';

@NgModule({
  declarations: [
    PerfilComponent,
    TareasComponent,
    VisitasemanalComponent,
    ColeccionespComponent,
    MisvecinosComponent,
    TareaMenuComponent,
    VecinoMenuComponent,
    FiltroVecinoPipe,
    VecinosPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharingModule
  ],
  providers: [CookieService]
})

export class PerfilModule { }
