import { Component, HostListener, OnInit } from '@angular/core';
import { CatSuenoService } from 'app/cat-sueno/cat-sueno.service';
import { Sueno } from 'app/general/interfaces';
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
  _catSueno: CatSuenoService;
  constructor(catSueno: CatSuenoService, _albumService: AlbumService, _verification: VerificationService) {
    this.albumService = _albumService;
    this.verification = _verification;
    this._catSueno = catSueno;
  }
  imagenes = [];
  mostrado="";
  preview="";
  borradoImagen=false;
  agregaImagen=false;
  errorImageForm="";
  miSueno: Sueno;
  async ngOnInit(): Promise<void> {
    await this.verification.verify().then(async() => {
      this.albumService.leeFotos().then(async(data)=>{
        let j = data.length;
        for(let i =0; i<j; i++){
          this.imagenes.push(data.pop()['url_img']);
        }
        this.mostrado = this.imagenes[0];
      });
      this._catSueno.readMiSueno().then(async suenoUsuario => {
        this.miSueno = suenoUsuario[0];
      })
    });
  }
  @HostListener("window:scroll")
  onScroll(){
    this.agregaImagen = false;
  }
  activaBorradoImagen(){
    this.borradoImagen=!this.borradoImagen;
  }
  muestra(item: string){
    console.log(this.miSueno);
    if(this.borradoImagen){
      this.albumService.eliminaFoto(item);
      let i = this.imagenes.indexOf(item);
      this.imagenes.splice(i,1);
      if(this.imagenes.length==0){
        this.borradoImagen=false;
        this.mostrado = "";
      }else{
        this.mostrado = this.imagenes[0];
      }
    }else{
      this.mostrado = item;
    }
  }

  previewItem(item: string){
    this.preview = item;
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
      if(datos.match(/^(http(s)?:\/\/)?(www.)?((\w|-))+\.(\w|-)+(\.(\w|-)+)*((\/(\w|-)+))*(\.(\w|-)+)?((\?(\w|-)+\=(\w|-)+)(\&(\w|-)+\=(\w|-)+)*)?$/gm)
      && !(datos.includes("data:image") && datos.includes("base64"))){
        this.errorImageForm='';
        this.albumService.agregaFoto(datos);
        $("#inputUrlImagen").val('');
        this.agregaImagen = false;
        this.imagenes.push(datos);
        if(this.imagenes.length==1){
          this.mostrado = this.imagenes[0];
        }
      }else{
        this.errorImageForm="Esta url es incorrecta";
      }
    }else{
      this.errorImageForm="Esta url ya esta guardada";
    }
  }
}
