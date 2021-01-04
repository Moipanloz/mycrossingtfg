import { TareasService } from './tarea.service';
import { CookieService } from 'ngx-cookie-service';
import { Tarea } from './../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Verification } from '../../app.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit{

  data = [];
  verification : Verification;
  cookieService: CookieService;
  modoEdicion : boolean = false;
  funcion = "actualizaTarea(tarea)";

  constructor(private http : HttpClient, verification : Verification, cookieService: CookieService, private _tarea : TareasService) {
    this.verification = verification;
    this.cookieService = cookieService;
  }

  ngOnInit(){
    this.verification.verify().then(() => {
      this._tarea.readTareas().subscribe(data => {
        this.data = [];
        this.data.push(data);
      },error => console.error(error));
    });
  }

  activaEdicion(){
    this.modoEdicion = !this.modoEdicion;
    if(this.modoEdicion){
      this.funcion = "abreMenu()";
    }else{
      this.funcion = "actualizaTarea(tarea)";
    }
  }

  abreMenu(){
    //TODO
  }

  actualizaTarea(tarea : Tarea){
    this._tarea.actualizaTarea(tarea).then(() => {
      this.ngOnInit();
    });
  }

  //no se si esto es necesario, probar cuando funcione
  /*
  mantenerEdicion(modoEdicion : boolean){
    this.ngOnInit();
    this.modoEdicion = modoEdicion;
  }*/

  crearTarea(){
    if(this.data[0].length < 10){
      console.log("dentro del create ts");
      this._tarea.crearTarea().then(() => {
        console.log("before oninit");
        this.ngOnInit();  //this.mantenerEdicion(true);
      });
    }else{
      alert("No se pueden crear mas tareas");
    }
  }

  /* TODO:

    2. que se resetee cada dia -> o añadir coluymna con fecha o mirar que el server almacene var
    3. que como max haya 10, y el quitar o añadir cambie entre visible e invisible

  */

}
