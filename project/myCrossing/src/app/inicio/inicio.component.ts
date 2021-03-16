import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { VerificationService } from 'app/general/services/verification.service';
import { items } from 'animal-crossing';
import { pipeFromArray } from 'rxjs/internal/util/pipe';

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
  }
}
