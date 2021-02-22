import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visita } from 'app/general/interfaces';
import { VerificationService } from 'app/general/verification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {
  verification:VerificationService;
  url : string = "http://localhost/visita.php";
  constructor(private http : HttpClient, verification : VerificationService) {
    this.verification = verification;
  }

  readVisitas() : Observable<Visita[]>{
    let parametros = new HttpParams()
      .set("command", "read")
      .set("verif", this.verification.verifCode)
      .set("userId", JSON.stringify(this.verification.user));

    return this.http.get<Visita[]>(this.url, {params: parametros});
  }
}
