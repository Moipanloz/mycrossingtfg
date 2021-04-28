import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorVisChange : BehaviorSubject<boolean>;
  errorMssgChange : BehaviorSubject<string>;

  constructor() {
    this.errorVisChange = new BehaviorSubject<boolean>(true);
    this.errorMssgChange = new BehaviorSubject<string>("");
  }

  setNewError(mssg : string){
    this.errorVisChange.next(false);
    this.errorMssgChange.next(mssg);
    console.log(mssg);
  }

  getErrorVis() : Observable<boolean>{
    return this.errorVisChange.asObservable();
  }

  getErrorMssg() : Observable<string>{
    return this.errorMssgChange.asObservable();
  }

  cleanError(){
    this.errorVisChange.next(true);
    this.errorMssgChange.next("");
  }
}
