import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  @Output() showError = new EventEmitter<string>();

  constructor() { }

  setNewError(mssg : string){
    this.showError.emit(mssg);
  }
}
