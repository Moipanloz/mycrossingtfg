import { Component } from '@angular/core';
import { AppConstants } from '../app.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  globals: AppConstants;

  constructor(appConstants : AppConstants) {
    this.globals = appConstants;
  }

  imagen : number;

}
