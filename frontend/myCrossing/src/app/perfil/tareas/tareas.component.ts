import { TareaMenuComponent } from './tarea-menu/tarea-menu.component';
import { TareasService } from './tarea.service';
import { CookieService } from 'ngx-cookie-service';
import { Tarea } from './../../interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  tareaMenu : Tarea;

  @ViewChild(TareaMenuComponent) menu : TareaMenuComponent;

  constructor(
    verification : Verification,
    cookieService: CookieService,
    private _tarea : TareasService){

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
  }

  abreMenu(event, tarea : Tarea){
    if(this.tareaMenu != null && this.tareaMenu.id == tarea.id && this.menu.visibility == "visible"){
        this.menu.cierraMenu();
    }else{
      this.tareaMenu = tarea;
      let x = (event.target.offsetLeft / window.innerWidth) * 100;
      let y = ((event.target.offsetTop + event.target.offsetHeight) / window.innerHeight ) * 100;
      let coord = [x, y];
      this.menu.abreMenu(event, coord);
    }
  }

  cierraMenu(){
    this.menu.cierraMenu();
  }

  crearTarea(){
    if(this.data[0].length < 10){
      console.log("dentro del create ts");
      this._tarea.crearTarea().then(() => {
        console.log("before oninit");
        this.ngOnInit();
      });
    }else{
      alert("No se pueden crear mas tareas");
    }
  }

  checkTarea(tarea : Tarea){

    // Le cambio el estado a la tarea, no se puede hacer con "tarea.hecha = !tarea.hecha"
    // porque si no ocurre lo mencionado arriba
    if(tarea.hecha == false){
      tarea.hecha = true;
    }else{
      tarea.hecha = false;
    }

    this.actualizaTarea(tarea);
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