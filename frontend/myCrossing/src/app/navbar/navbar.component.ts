import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  globals: AppConstants;

  constructor(appConstants: AppConstants, private router : Router) {
    this.globals = appConstants;
  }

  logout(){
    this.globals.logged=false;
    this.router.navigate([""]);
  }
}
