import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  mensaje : string = "pp";
  esconder : boolean = true;

  errorVisChange : Subject<boolean> = new Subject<boolean>();
  errorMssgChange : Subject<string> = new Subject<string>();

  constructor() {
    this.errorVisChange.subscribe((vis) => {
      this.esconder = vis;
    });

    this.errorMssgChange.subscribe((mesj) => {
      this.mensaje = mesj;
      console.log("nuevo valor")
      console.log(this.mensaje)

    });
  }

  setNewError(mssg : string){
    this.errorVisChange.next(false);
    this.errorMssgChange.next(mssg);
    console.log(mssg);
  }

  cleanError(){
    this.errorVisChange.next(true);
    this.errorMssgChange.next("");
  }
}
