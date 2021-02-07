import { SharingModule } from './../general/sharing.module';
import { AppModule } from './../app.module';
import { CapitalizePipe } from './../general/capitalize.pipe';
import { FiltroVecinoPipe } from './misvecinos/vecino-menu/filtro-vecino.pipe';
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
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    PerfilComponent,
    TareasComponent,
    VisitasemanalComponent,
    ColeccionespComponent,
    MisvecinosComponent,
    TareaMenuComponent,
    VecinoMenuComponent,
    FiltroVecinoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharingModule
  ],
  providers: [CookieService]
})

export class PerfilModule { }
