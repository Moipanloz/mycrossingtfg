import { Component, HostListener, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor() { }
  imagenes;
  mostrado="";
  agregaImagen=false;
  errorImageForm=false;
  ngOnInit(): void {
    this.imagenes = ['../../../assets/images/aleatorio.png','../../../assets/images/alcatifa.png','../../../assets/images/betunio.png','../../../assets/images/switch.png'];
    this.mostrado = this.imagenes[0];
  }
  @HostListener("window:scroll")
  onScroll(){
    this.agregaImagen = false;
  }
  muestra(item: string){
    this.mostrado = item;
  }
  abreModalImagen(){
    this.agregaImagen=true;
  }
  cierraModalImagen(){
    this.agregaImagen=false;
  }
  paraPropagacion(e:MouseEvent){
    e.stopPropagation();
  }
  enviarDatos(){
    let datos: String = $("#inputUrlImagen").val().toString();
    if(datos.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')){
      this.errorImageForm=false;

    }else{
      this.errorImageForm=true;
    }
  }
}
