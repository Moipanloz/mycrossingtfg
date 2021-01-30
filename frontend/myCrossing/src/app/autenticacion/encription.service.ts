import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncriptionService {

  constructor() { }
  encript(text:string):string{
    return CryptoJS.AES.encrypt(text.trim(), "adhojklgenv").toString();
  }
  decript(text:string):string{
    return CryptoJS.AES.decrypt(text.trim(), "adhojklgenv").toString(CryptoJS.enc.Utf8);
  }
}
