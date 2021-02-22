import { Component, OnInit } from '@angular/core';
import { VerificationService } from 'app/general/verification.service';
import { CookieService } from 'ngx-cookie-service';
import { VisitasService } from './visitas.service';

@Component({
  selector: 'app-visitasemanal',
  templateUrl: './visitasemanal.component.html',
  styleUrls: ['./visitasemanal.component.css']
})
export class VisitasemanalComponent implements OnInit {

  verification: VerificationService;
  cookieService: CookieService;
  constructor(
    verification : VerificationService,
    cookieService: CookieService,
    private visitas : VisitasService){

    this.verification = verification;
    this.cookieService = cookieService;
  }
  hide :boolean = true;

  lpa = "totakeke";
  mpa = null;
  xpa = null;
  jpa = null;
  vpa = null;
  spa = null;
  dpa = null;

  lpr = null;
  mpr = null;
  xpr = null;
  jpr = null;
  vpr = null;
  spr = null;
  dpr = null;
  ngOnInit(): void {
    let datos = [];
    this.verification.verify().then(() => {
      this.visitas.readVisitas().subscribe(data => {
        this.lpa=data[0]['lpa'];
        this.mpa=data[0]['mpa'];
        this.xpa=data[0]['xpa'];
        this.jpa=data[0]['jpa'];
        this.vpa=data[0]['vpa'];
        this.spa=data[0]['spa'];
        this.dpa=data[0]['dpa'];
        this.lpr=data[0]['lpr'];
        this.mpr=data[0]['mpr'];
        this.xpr=data[0]['xpr'];
        this.jpr=data[0]['jpr'];
        this.vpr=data[0]['vpr'];
        this.spr=data[0]['spr'];
        this.dpr=data[0]['dpr'];
      },error => console.error(error));
    });
  }
  vacio(event: any, datos:string){
    if(this.hide==false){
      this.hide=true;
    }else{
      this.hide=false;
    }
  }
}
