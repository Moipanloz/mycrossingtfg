import { Component } from '@angular/core';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  /* TODO:
    1. que no se resetee al cambiar de pag
    2. que se resetee cada dia
    3. que como max haya 10, y el quitar o añadir cambie entre visible e invisible
    4. que se guarden las tareas (el tipo y numero)

    tiene pinta que es con BDD, tabla tareas con 10 filas mxa, contiene un user_id, estado, imagen
    el html lo consume como un for que recorre filas, el estado se resetea cada dia

    de la misma forma, se aplica esto a todo lo que dependa del user, mis vecinos, mis colecciones, etc
  */

  b1 : boolean = false;
  b2 : boolean = false;
  b3 : boolean = false;
  b4 : boolean = false;
  b5 : boolean = false;
  b6 : boolean = false;
  b7 : boolean = false;
  b8 : boolean = false;
  b9 : boolean = false;
  b10 : boolean = false;

  constructor() { }

  cambiaId(b : boolean){
    if (b) {
      return "done";
    }else{
      return "todo";
    }
  }
}
