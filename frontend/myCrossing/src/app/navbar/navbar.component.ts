import { UsuarioModule } from './../usuario/usuario.module';
import { Component } from '@angular/core';
import { Verification } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  verification: Verification;
  cookieService: CookieService;
  usuario : UsuarioModule;
  constructor(cookieService: CookieService, verification: Verification, private http: HttpClient) {
    this.cookieService = cookieService;
    this.verification = verification;
  }

  logOut(){
    let userId = this.verification.user;
    this.cookieService.delete('verif');
    this.cookieService.delete('userId');
    this.http.post("http://localhost/setNullKey.php", JSON.stringify(userId)).subscribe(data => {},error => console.error(error));
    this.verification.logged = false;
    this.verification.user = null;
  }


}
