import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { VerificationService } from 'app/general/verification.service';
import { npcs } from 'animal-crossing';
import { items } from 'animal-crossing';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  verification: VerificationService;
  cookieService: CookieService;
  constructor(cookieService: CookieService, verification: VerificationService, private http: HttpClient,) {
    this.verification = verification;
    this.cookieService = cookieService;
  }
  imagen: number;

  ngOnInit(): void {
    if(!this.verification.verified){
      this.verification.verify();
    }

    //===============TODO BORRAR==========================
    //items.forEach(f => console.log(f));
    let pipo = items.filter(f => f.sourceSheet == "Clothing Other");
    for(let vari of pipo[2].variations){
      console.log(pipo);
    }
    //console.log(pipo[2].variations);
    // let pipo = new Array<string>();
    // items.forEach(f => !pipo.includes(f.sourceSheet) ? pipo.push(f.sourceSheet) : "");
    // console.log(pipo);

  }
}
