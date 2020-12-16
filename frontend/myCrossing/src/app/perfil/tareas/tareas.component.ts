import { Tarea } from './../../interfaces';
import { TareaService } from './tarea.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../app.component';
import { debounceTime } from "rxjs/operators";


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit{

  data = [];
  globals : AppConstants;
  mostrar : boolean = false;

  constructor(private http : HttpClient, appConstants : AppConstants, private _tarea : TareaService) {
    this.globals = appConstants;
  }

  ngOnInit(){
    this._tarea.readTareas().pipe(debounceTime(300)).subscribe(data => {
      this.data = [];
      this.data.push(data);
      //console.log(this.data);
    },error => console.error(error));

  }

  cambiaEstado(tarea : Tarea){
    this._tarea.checkTarea(tarea).subscribe();
    //setTimeout(() => this.ngOnInit(),300);
  }

  /* TODO:

    2. que se resetee cada dia -> o añadir coluymna con fecha o mirar que el server almacene var
    3. que como max haya 10, y el quitar o añadir cambie entre visible e invisible

  */

}
