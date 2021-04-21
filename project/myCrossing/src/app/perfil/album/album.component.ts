import { Component, HostListener, OnInit } from '@angular/core';
import { VerificationService } from 'app/general/services/verification.service';
import * as $ from 'jquery';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albumService: AlbumService;
  verification: VerificationService;
  constructor(_albumService: AlbumService, _verification: VerificationService) {
    this.albumService = _albumService;
    this.verification = _verification;
  }
  imagenes = [];
  mostrado="";
  agregaImagen=false;
  errorImageForm="";
  async ngOnInit(): Promise<void> {
    await this.verification.verify().then(async() => {
      this.albumService.leeFotos().then(async(data)=>{
        let j = data.length;
        for(let i =0; i<j; i++){
          this.imagenes.push(data.pop()['url_img']);
        }
        this.mostrado = this.imagenes[0];
      });
    });
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
    if(datos!=null && !this.imagenes.includes(datos)){
      if(datos.match('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')){
        this.errorImageForm='';
        this.albumService.agregaFoto(datos);
        $("#inputUrlImagen").val('');
        this.agregaImagen = false;
        this.imagenes.push(datos);
      }else{
        this.errorImageForm="Esta url es incorrecta";
      }
    }else{
      this.errorImageForm="Esta url ya esta guardada";
    }
  }
}
