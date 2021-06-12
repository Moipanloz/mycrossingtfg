import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IItem, items } from 'animal-crossing';
import { CatSuenoService } from 'app/cat-sueno/cat-sueno.service';
import { Sueno } from 'app/general/interfaces';
import { ErrorService } from 'app/general/services/error.service';
import { PaginacionService } from 'app/general/services/paginacion.service';
import { VerificationService } from 'app/general/services/verification.service';
import { AlbumService } from 'app/perfil/album/album.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cat-sueno',
  templateUrl: './cat-sueno.component.html',
  styleUrls: ['./cat-sueno.component.css']
})
export class CatSuenoComponent implements OnInit {

  listaItems = new Array<Sueno>();
  suenoUsuario : Sueno;
  _verif : VerificationService;
  page_number : number = 1;
  max_items : number = 40;
  num_paginas : Array<number>;
  _pag : PaginacionService;
  busqueda = new FormControl("");
  _catsueno : CatSuenoService;
  _error : ErrorService;
  nameFilter: string="";
  fotosSeleccionadas: string[] = [];
  fotos: String[] = [];
  _album: AlbumService;
  misLikes: String[] = [];
  espera: boolean = true;
  espera2: boolean = true;
  filtroLikes: boolean = false;

  constructor(albumService: AlbumService, verif : VerificationService, pag : PaginacionService, catsueno : CatSuenoService, errorService : ErrorService) {
    this._verif = verif;
    this._pag = pag;
    this._catsueno = catsueno;
    this._error = errorService;
    this._album = albumService;
  }

  ngOnInit() {
    this._verif.verify().then( async () => {
      this._catsueno.readSuenos().then(suenos=>{
        this.listaItems = suenos;
        this.listaItems.map(sueno => {
          sueno.foto_seleccionada=0;
        });
        this.num_paginas = this.getPaginas(this.listaItems);
        if(this.espera2){
          this.espera2 = false;
        }else{
          this.espera = false;
        }
      });
      if(this._verif.user != null){
        this._catsueno.readMiSueno().then(async suenoUsuario => {
          this.suenoUsuario = suenoUsuario[0];
        }).catch(err => {
          this._error.setNewError(err.message);
          setTimeout(() => {this._error.cleanError()}, 3000);
        });
        this._album.leeFotos().then(async fotos => {
          let aux: String[] = [];
          fotos.forEach(f=>aux.push(f["url_img"]));
          this.fotos=aux;
        });
        this._catsueno.readMisLikes().then(async codigos => {
          let aux: string[] = [];
          codigos.map(c=> aux.push(c["codigo_sueno"]));
          this.misLikes = aux;
          if(this.espera2){
            this.espera2 = false;
          }else{
            this.espera = false;
          }
        });
      }
    }).catch(err => {
      this._error.setNewError(err.message);
      setTimeout(() => {this._error.cleanError()}, 3000)
    });
    this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe(value => this.filtrar(value));
  }

  @HostListener("window:scroll")
  onScroll(){
    this.cierraModales();
  }

  darLike(codigo: string){
    if(this._verif.user!=null && !this.espera){
      this.espera=true;
      this.espera2=true;
      if(this.misLikes.includes(codigo)){
        this._catsueno.deleteLike(codigo);
        this.ngOnInit();
      }else{
        this._catsueno.creaLike(codigo);
        this.ngOnInit();
      }
    }

  }

  borrarSueno(){
    this._catsueno.borrarSueno(this.suenoUsuario.codigo_sueno).then(async ()=>{
      await setTimeout("",500);
      this.ngOnInit();
    });
    this.cierraModales();
  }

  pedirBorrar(){
    $("#suenoEditDelete").hide();
    $("#suenoDelete").show();
  }

  cancelarBorrar(){
    $("#suenoEditDelete").show();
    $("#suenoDelete").hide();
  }

  async guardarSueno(){
    this.espera=true;
    this.espera2=true;
    if(await this._catsueno.existeCodigo($("#inputCodigoSuenoEdit").val().toString())){
      $("#erroresSuenoEdit").text("Este código de sueño ya está siendo usado por otro usuario");
    }else if(!$("#inputCodigoSuenoEdit").val().toString().match(/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)){
      $("#erroresSuenoEdit").text("El código debe tener el siguiente formato: DA-1234-1234-1234");
    }else if(this.fotos.length==0){
      $("#erroresSuenoEdit").text("Debe poseer alguna foto en el álbum, puedes añadirla desde tu perfil");
    }else if(this.fotosSeleccionadas.length<1 || this.fotosSeleccionadas.length>3){
      $("#erroresSuenoEdit").text("Debes seleccionar entre 1 y 3 imágenes");
    }else{
      if(this.suenoUsuario.codigo_sueno != $("#inputCodigoSuenoEdit").val().toString()){
        this._catsueno.mueveLikes(this.suenoUsuario.codigo_sueno, $("#inputCodigoSuenoEdit").val().toString());
        this._catsueno.borrarLikes(this.suenoUsuario.codigo_sueno);
      }
      this._catsueno.guardaSueno($("#inputCodigoSuenoEdit").val().toString(), this.fotosSeleccionadas, false).then(async ()=>{
        await setTimeout("",500);
        this.ngOnInit();
      });
      this.cierraModales();
    }
  }

  async crearSueno(){
    if(await this._catsueno.existeCodigo($("#inputCodigoSuenoCrear").val().toString())){
      $("#erroresSuenoCrear").text("Este código de sueño ya está siendo usado por otro usuario");
    }else if(!$("#inputCodigoSuenoCrear").val().toString().match(/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)){
      $("#erroresSuenoCrear").text("El código debe tener el siguiente formato: DA-1234-1234-1234");
    }else if(this.fotos.length==0){
      $("#erroresSuenoCrear").text("Debe poseer alguna foto en el álbum, puedes añadirla desde tu perfil");
    }else if(this.fotosSeleccionadas.length<1 || this.fotosSeleccionadas.length>3){
      $("#erroresSuenoCrear").text("Debes seleccionar entre 1 y 3 imágenes");
    }else{
      this._catsueno.guardaSueno($("#inputCodigoSuenoCrear").val().toString(), this.fotosSeleccionadas, true).then(async ()=>{
        await setTimeout("",500);
        this.ngOnInit();
      });
      this.cierraModales();
    }
  }

  agregaFoto(foto: string){
    if(this.fotosSeleccionadas.includes(foto)){
      this.fotosSeleccionadas.splice(this.fotosSeleccionadas.indexOf(foto),1);
    }else{
      if(this.fotosSeleccionadas.length>=3){
        this._error.setNewError("Solo puedes seleccionar 3 imágenes");
        setTimeout(() => {this._error.cleanError()}, 3000);
      }else{
        this.fotosSeleccionadas.push(foto);
      }
    }
  }

  paraPropagacion(e:MouseEvent){
    e.stopPropagation();
  }

  cierraModales(){
    $("#modalCreacionSueno").hide();
    $("#modalMiSueno").hide();
    $("#modalFondo").hide();
  }

  levantaPerfil(){
    if(this.suenoUsuario==null){
      $("#erroresSuenoCrear").text("");
      this.fotosSeleccionadas = [];
      document.getElementById("modalCreacionSueno").style.display = "block";
    }else{
      this.cancelarBorrar();
      $("#erroresSuenoEdit").text("");
      $("#inputCodigoSuenoEdit").val(this.suenoUsuario.codigo_sueno);
      this.fotosSeleccionadas = [];
      this.fotosSeleccionadas.push(this.suenoUsuario.foto1);
      if(this.suenoUsuario.foto2!=null && this.suenoUsuario.foto2!="")
        this.fotosSeleccionadas.push(this.suenoUsuario.foto2);
      if(this.suenoUsuario.foto3!=null && this.suenoUsuario.foto3!="")
        this.fotosSeleccionadas.push(this.suenoUsuario.foto3);
      document.getElementById("modalMiSueno").style.display = "block";
    }
    document.getElementById("modalFondo").style.display = "block";
  }

  eligeFoto(item: Sueno): string{
    switch(item.foto_seleccionada){
      case 0:
        return item.foto1;
      case 1:
        return item.foto2;
      case 2:
        return item.foto3;
      default:
        return "error";
    }
  }

  filtrar(value){
    this.nameFilter = value;
    this.page_number = 1;
  }

  getImage(sueno : Sueno, sube : boolean){
    if(sueno!=null){
      if(sube){
        if(this.getLenght(sueno)-1==sueno.foto_seleccionada){
          sueno.foto_seleccionada=0;
        }else{
          sueno.foto_seleccionada+=1;
          switch(sueno.foto_seleccionada){
            case 0:
              document.getElementById(sueno.nombre.replace(" ", "")).setAttribute("src",sueno.foto1);
              break;
            case 1:
              document.getElementById(sueno.nombre.replace(" ", "")).setAttribute("src",sueno.foto2);
              break;
            case 2:
              document.getElementById(sueno.nombre.replace(" ", "")).setAttribute("src",sueno.foto3);
              break;
          }
        }
      }else{
        if(sueno.foto_seleccionada==0){
          sueno.foto_seleccionada=this.getLenght(sueno)-1;
        }else{
          sueno.foto_seleccionada-=1;
        }
      }
    }
  }
  getLenght(sueno: Sueno):number{
    let res: number;
    if(sueno.foto2==null || sueno.foto2==""){
      res=1;
    }else if(sueno.foto3==null || sueno.foto3==""){
      res=2;
    }else{
      res=3;
    }
    return res;
  }

  getImageElement(item : IItem){
    return document.getElementById(item.name.replace(" ", ""));
  }

  getPaginas(lista : Array<any>){
    return Array.from({length: Math.ceil(lista.length / this.max_items)}, (_, i) => i+1)
  }

}
