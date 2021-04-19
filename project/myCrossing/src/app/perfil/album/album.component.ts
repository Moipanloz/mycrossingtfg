import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor() { }
  imagenes;
  mostrado="";
  ngOnInit(): void {
    this.imagenes = ['../../../assets/images/aleatorio.png','../../../assets/images/alcatifa.png','../../../assets/images/betunio.png','../../../assets/images/switch.png'];
    this.mostrado = this.imagenes[0];
  }
  muestra(item: string){
    this.mostrado = item;
  }

}
