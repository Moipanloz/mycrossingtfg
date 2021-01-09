import { TareasService } from './tarea.service';
import { CookieService } from 'ngx-cookie-service';
import { Tarea } from './../../interfaces';
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
  menu : boolean;
  tareaMenu : Tarea;

  constructor(
    verification : Verification,
    cookieService: CookieService,
    private _tarea : TareasService){

    this.verification = verification;
    this.cookieService = cookieService;
  }

  ngOnInit(){
    this.tareaMenu = null;
    this.menu = false;

    this.verification.verify().then(() => {
      this._tarea.readTareas().subscribe(data => {
        this.data = [];
        this.data.push(data);
      },error => console.error(error));
    });
  }

  activaEdicion(){
    this.modoEdicion = !this.modoEdicion;
  }

  abreMenu(tarea : Tarea){
    this.menu = !this.menu;
    if(this.tareaMenu == null){
      this.tareaMenu = tarea;
    }else{
      this.tareaMenu = null;
    }
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

  actualizaTarea(tarea : Tarea){
    this._tarea.actualizaTarea(tarea).then(() => {
      this.ngOnInit();
    });
  }

  borrarTarea(tarea : Tarea){
    this._tarea.borrarTarea(tarea).then(() => {
      this.ngOnInit();
    });
  }


}
