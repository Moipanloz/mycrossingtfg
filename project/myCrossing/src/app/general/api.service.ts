import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data = [];
  constructor(private http: HttpClient) { }

  async readAllVillagers() : Promise<any> {
    let result = await this.http.get<any>("http://acnhapi.com/v1/villagers").toPromise();
    console.log(result['ant00']['id']);
    return result;
  }

  async readVillagerById(villagerID: number) : Promise<any> {
    let result = await this.http.get<any>("http://acnhapi.com/v1/villagers/" + villagerID).toPromise();
    console.log(result);
    return result;
  }
  
}
