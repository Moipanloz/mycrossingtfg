import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Crossing';

  constructor(){

  }

}
@Injectable({ providedIn: 'root' })
export class AppConstants {
  logged: boolean = false;
  user: number = null;
}

