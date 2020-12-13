import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../app.component';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit{

  data = [];
  globals : AppConstants;

  constructor(private http : HttpClient, appConstants : AppConstants) {
    this.globals = appConstants;
  }

  ngOnInit(){
    this.data = [];
    this.http.get("http://localhost/tareas.php?id="+this.globals.user).subscribe(data => {
      this.data.push(data);
      console.log(this.data)
    },error => console.error(error));
  }

  cambiaEstado(id : Number, hecha : Number){
    if(hecha == 0){
      hecha = 1;
    }else{
      hecha = 0;
    }

    this.http.get("http://localhost/tareasCRUD.php?action=update&hecha="+hecha+"&id="+id).subscribe();
    setTimeout(() => this.ngOnInit(),150);

  }

  /* TODO:

    2. que se resetee cada dia -> o añadir coluymna con fecha o mirar que el server almacene var
    3. que como max haya 10, y el quitar o añadir cambie entre visible e invisible

  */

}
