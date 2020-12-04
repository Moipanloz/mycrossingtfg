import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MyCrossing';
  data = [];
  constructor(private http: HttpClient){}

  ngOnInit (){
    this.http.get("http://localhost/prueba.php").subscribe(data => {
    this.data.push(data);
    console.log(this.data);
    },error => console.error(error));
  }

}


