import { PaginacionService } from './general/services/paginacion.service';
import { SharingModule } from './general/sharing.module';
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
import { VerificationService } from './general/services/verification.service';
import { CatRopaComponent } from './cat-ropa/cat-ropa.component';
import { CatMuebleComponent } from './cat-mueble/cat-mueble.component';
import { CatFosilComponent } from './cat-fosil/cat-fosil.component';
import { CatArteComponent } from './cat-arte/cat-arte.component';
import { CatInsectosComponent } from './cat-insectos/cat-insectos.component';
import { TraducirPipe } from './cat-insectos/traducir.pipe';
import { MesesTextualesPipe } from './cat-insectos/meses-textuales.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    FooterComponent,
    CatRopaComponent,
    CatMuebleComponent,
    CatFosilComponent,
    CatArteComponent,
    CatInsectosComponent,
    TraducirPipe,
    MesesTextualesPipe
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
