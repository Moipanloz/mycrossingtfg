import { CookieService } from 'ngx-cookie-service';
import { Tarea } from './../../interfaces';
import { TareaService } from './tarea.service';
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
  mostrar : boolean = false;

  constructor(private http : HttpClient, verification : Verification, cookieService: CookieService, private _tarea : TareaService) {
    this.verification = verification;
    this.cookieService = cookieService;
  }

  ngOnInit(){
    console.log("oninit");
    this.verification.verifyIfNotVerified().then(() => {
      console.log("post verif");
      this._tarea.readTareas().subscribe(data => {
        console.log(data[0]);
        this.data = [];
        this.data.push(data);
      },error => console.error(error));
      console.log("data tiene datos");
      console.log(this.data[0]);
    });
  }

  cambiaEstado(tarea : Tarea){
    this._tarea.updateTarea(tarea).then(() => {
      this.ngOnInit();
    });
  }

  /* TODO:

    2. que se resetee cada dia -> o añadir coluymna con fecha o mirar que el server almacene var
    3. que como max haya 10, y el quitar o añadir cambie entre visible e invisible

  */

}
