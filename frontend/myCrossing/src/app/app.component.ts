import { UserService } from 'app/autenticacion/user.service';
import { Component, OnInit } from '@angular/core';
import { VerificationService } from './general/verification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'My Crossing';
  nombre : string = "";

  constructor(private _user : UserService, private verification : VerificationService){}

  ngOnInit(){
    this.verification.verify().then(() => {
      this._user.readUser().then(data => {
        this.nombre = data[0]["nombre"];
      });
    });
  }

}
