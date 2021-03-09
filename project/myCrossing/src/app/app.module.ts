import { PaginacionService } from './general/paginacion.service';
import { SharingModule } from './general/sharing.module';
import { CapitalizePipe } from './general/capitalize.pipe';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RoutingModule } from './general/routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { PerfilModule } from './perfil/perfil.module';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { VerificationService } from './general/verification.service';
import { CatRopaComponent } from './cat-ropa/cat-ropa.component';
import { FiltroRopaPipe } from './cat-ropa/filtro-ropa.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    FooterComponent,
    CatRopaComponent,
    FiltroRopaPipe
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    RouterModule,
    HttpClientModule,
    PerfilModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharingModule
  ],
  providers: [
    CookieService,
    VerificationService,
    PaginacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
