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

  async readAllItems() : Promise<any> {
    let resHW = await this.http.get<any>("http://acnhapi.com/v1/houseware").toPromise();
    let resWM = await this.http.get<any>("http://acnhapi.com/v1/wallmounted").toPromise();
    let resM = await this.http.get<any>("http://acnhapi.com/v1/misc").toPromise();
    let res = Array<any>();
    res.push(resHW, resWM, resM);
    return res;
  }

  //No se usa de momento?
  async readItemById(itemId: number, ruta : string) : Promise<string> {
    let result = await this.http.get<any>("http://acnhapi.com/v1/"+ruta+"/"+itemId).toPromise();
    return result;
  }

}
