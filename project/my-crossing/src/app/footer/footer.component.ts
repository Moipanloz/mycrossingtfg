import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  showInfo : boolean = false;

  @HostListener("window:scroll")
  onScroll(){
    this.showInfo = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

  cierra(){
    if(this.showInfo){
      this.showInfo = false;
    }
  }

  toggle(e: MouseEvent){
    this.showInfo = !this.showInfo
    e.stopPropagation();
  }
}
