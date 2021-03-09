import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recipes } from 'animal-crossing';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  data = [];
  url : string = "http://acnhapi.com/v1/";
  constructor(private http: HttpClient) { }

  async readAllVillagers() : Promise<any> {
    let result = await this.http.get<any>(this.url+"villagers").toPromise();
    return result;
  }

  readVillagerById(villagerID: number) : Promise<any> {
    let result = this.http.get<any>(this.url+"villagers/" + villagerID).toPromise();
    return result;
  }

    //No se usa de momento?
  async readAllItems() : Promise<any> {
    let resHW = await this.http.get<any>(this.url+"houseware").toPromise();
    let resWM = await this.http.get<any>(this.url+"wallmounted").toPromise();
    let resM = await this.http.get<any>(this.url+"misc").toPromise();
    let res = Array<any>();
    res.push(resHW, resWM, resM);
    return res;
  }

  //No se usa de momento?
  async readItemById(itemId: string, ruta : string) : Promise<any> {
    let result = await this.http.get<any>(this.url+ruta+"/"+itemId).toPromise();

    return result;
  }

}
