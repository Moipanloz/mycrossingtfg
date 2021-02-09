import { VerificationService } from 'app/general/verification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My Crossing';
  verification : VerificationService;

  constructor(){}

}
