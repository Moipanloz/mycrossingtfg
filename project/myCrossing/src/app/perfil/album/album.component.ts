import { Component, HostListener, OnInit } from '@angular/core';
import { CatSuenoService } from 'app/cat-sueno/cat-sueno.service';
import { Sueno } from 'app/general/interfaces';
import { ErrorService } from 'app/general/services/error.service';
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
  _error: ErrorService;
  constructor(errorService: ErrorService, catSueno: CatSuenoService, _albumService: AlbumService, _verification: VerificationService) {
    this.albumService = _albumService;
    this.verification = _verification;
    this._catSueno = catSueno;
    this._error = errorService;
  }
  imagenes = [];
  mostrado="";
  preview="";
  borradoImagen=false;
  agregaImagen=false;
  errorImageForm="";
  miSueno: Sueno;
  itemPorBorrar: string = "";
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
  ultimaFoto(foto: string): boolean{
    if(this.miSueno.foto1==foto && (this.miSueno.foto2==null || this.miSueno.foto2=="") && (this.miSueno.foto3==null || this.miSueno.foto3==""))
      return true;
    if(this.miSueno.foto2==foto && (this.miSueno.foto1==null || this.miSueno.foto1=="") && (this.miSueno.foto3==null || this.miSueno.foto3==""))
      return true;
    if(this.miSueno.foto3==foto && (this.miSueno.foto2==null || this.miSueno.foto2=="") && (this.miSueno.foto1==null || this.miSueno.foto1==""))
      return true;
    return false;
  }
  perteneceFotoSueno(foto: string): boolean{
    if(this.miSueno.foto1 == foto || this.miSueno.foto2 == foto || this.miSueno.foto3 == foto)
      return true;
    return false;
  }
  eliminaFotoSueno(sueno: Sueno, foto: string): Sueno{
    if(sueno.foto1==foto){
      if(sueno.foto3==null || sueno.foto3==""){
        sueno.foto1=sueno.foto2;
        sueno.foto2=null;
      }else{
        sueno.foto1=sueno.foto3;
        sueno.foto3=null;
      }
    }else if(sueno.foto2==foto){
      if(sueno.foto3==null || sueno.foto3==""){
        sueno.foto2=null;
      }else{
        sueno.foto2 = sueno.foto3;
        sueno.foto3 = null;
      }
    }else{
      sueno.foto3 = null;
    }
    this.miSueno = sueno;
    return sueno;
  }

  pedirBorrar(){
    $("#fondo").show();
    $("#modalConfirmaBorradoImagen").show();
  }

  borrarImagen(){
    this.cierraModales();
    this._catSueno.guardaSuenoEntidad(this.eliminaFotoSueno(this.miSueno, this.itemPorBorrar), false);
    this.albumService.eliminaFoto(this.itemPorBorrar);
    let i = this.imagenes.indexOf(this.itemPorBorrar);
    this.imagenes.splice(i,1);
    if(this.imagenes.length==0){
      this.borradoImagen=false;
      this.mostrado = "";
    }else{
      this.mostrado = this.imagenes[0];
    }
  }

  cancelarBorrar(){
    $("#fondo").hide();
    $("#modalConfirmaBorradoImagen").hide();
  }

  cierraModales(){
    $("#fondo").hide();
    $("#modalConfirmaBorradoImagen").hide();
  }

  muestra(item: string){
    if(this.borradoImagen){
      if(this.ultimaFoto(item)){
        this._error.setNewError("Esta es la última imagen de tu sueño. Para eliminarla, añade otra imágen a tu sueño o bórralo primero.");
        setTimeout(() => {this._error.cleanError()}, 5000);
      }else if(!this.perteneceFotoSueno(item)){
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
        this.itemPorBorrar = item;
        this.pedirBorrar();
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
