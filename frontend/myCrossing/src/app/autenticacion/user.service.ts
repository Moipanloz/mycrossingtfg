import { Injectable } from '@angular/core';
import { Verification } from '../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data = [];
  verification : Verification;
  url : String = "http://localhost/authentication.php";
  constructor(verification: Verification, private http: HttpClient) { this.verification = verification; }
  getUser() : Promise<User[]> {
    let parametros = new HttpParams().set("userId", JSON.stringify(this.verification.user)).set("action", "read");
    return this.http.get<User[]>(this.url + "", {params: parametros}).toPromise();
  }
  getAllUsers() : Promise<User[]> {
    let parametros = new HttpParams().set("action", "readAll");
    return this.http.get<User[]>(this.url + "", {params: parametros}).toPromise();
  }
}
