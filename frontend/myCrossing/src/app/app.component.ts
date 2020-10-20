import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  titulo = '';
  descripcion = '';
  constructor(private http: HttpClient){}

  ngOnInit (){
    this.http.get("http://localhost:8080/hello", {responseType: 'text'}).subscribe((resp: any) => {this.titulo = resp})
  }

}


