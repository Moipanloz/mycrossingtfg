import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My Crossing';

  constructor(){}

}

@Injectable({ providedIn: 'root' })
export class Verification {
  logged: boolean = false;
  user: number = null;
  verified: boolean = false;
  cookieService: CookieService;

  constructor(cookieService: CookieService, private http: HttpClient){
    this.cookieService = cookieService;
  }

  async verify() {
    if(this.cookieService.check("verif") && this.cookieService.check("userId")){
      let userId:number = +this.cookieService.get("userId");
      let parametros = new HttpParams().set("userId", JSON.stringify(userId)).set("command", "getKey");
      let datos = await this.http.get("http://localhost/authentication.php", {params: parametros}).toPromise();
      let verif = datos[0]['verification'];
      if(verif == this.cookieService.get("verif")){
        this.logged = true;
        this.user = userId;
      }else{
        this.logged = false;
        this.user = null;
      }
    }else{
      this.logged = false;
      this.user = null;
    }
    this.verified = true;
  }

  makeRandomKey(){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async verifyIfNotVerified(){
    if(!this.verified){
      await this.verify();
    }
  }

}
