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
  data = [];
  constructor(private http: HttpClient){}

  ngOnInit (){
   /*  this.http.get("http://localhost/prueba.php").subscribe(data => {
    this.data.push(data);
    console.log(this.data);
    },error => console.error(error)); */
  }

}
@Injectable({ providedIn: 'root' })
export class AppConstants {
  logged: boolean = false;
  user: number = null;
}

