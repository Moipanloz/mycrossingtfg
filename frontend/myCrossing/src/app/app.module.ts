import { ColeccionespComponent } from './perfil/coleccionesp/coleccionesp.component';
import { UsuarioModule } from './usuario/usuario.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TareasComponent } from './perfil/tareas/tareas.component';
import { VisitasemanalComponent } from './perfil/visitasemanal/visitasemanal.component';
import { MisvecinosComponent } from './perfil/misvecinos/misvecinos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    FooterComponent,
    PerfilComponent,
    TareasComponent,
    VisitasemanalComponent,
    MisvecinosComponent,
    ColeccionespComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    RouterModule,
    HttpClientModule,
    UsuarioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
