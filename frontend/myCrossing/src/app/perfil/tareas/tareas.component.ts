import { TareaMenuComponent } from './tarea-menu/tarea-menu.component';
import { TareasService } from './tarea.service';
import { CookieService } from 'ngx-cookie-service';
import { Tarea } from './../../interfaces';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  screenHeight : number;
  screenWidth : number;


  @ViewChild(TareaMenuComponent) menu : TareaMenuComponent;

  @HostListener("window:resize", ["$event"])
  getScreenSize(){
    console.log("hola");
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    //poner que espere un poco entre evento y evento
  }

  constructor(
    verification : Verification,
    cookieService: CookieService,
    private _tarea : TareasService){

    this.verification = verification;
    this.cookieService = cookieService;
    this.getScreenSize();
  }

  ngOnInit(){
    this.tareaMenu = null;

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
    this.tareaMenu = tarea;

    let x = event.target.offsetLeft;
    let y = event.target.offsetTop + event.target.offsetHeight;
    let coord = [x, y];
    this.menu.abreMenu(event, coord);

    //this._renderer.setAttribute(this._element.nativeElement   this.menuTarea.nativeElement, "visibility", "visible");

    //set visibility visible y poner x e y
    //si menu es visible y se vuelve a hacer click en el mismo lado, hacer que visibility hidden
  }

  cierraMenu(){
    this.menu.cierraMenu();
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
