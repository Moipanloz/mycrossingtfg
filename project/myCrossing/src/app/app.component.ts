import { ErrorService } from './general/services/error.service';
import { VerificationService } from 'app/general/services/verification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'My Crossing';
  verification : VerificationService;
  esconder : boolean;
  errMssg : string;

  constructor(private _error : ErrorService){}

  ngOnInit(){
    this._error.getErrorMssg().subscribe((mesj) => this.errMssg = mesj);
    this._error.getErrorVis().subscribe((vis) => this.esconder = vis);
  }
}
