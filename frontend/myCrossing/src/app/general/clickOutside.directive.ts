import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef, public render : Renderer2) { }

  @Output() clickOutside = new EventEmitter();

  @HostListener("document:click", ["$event.target"])
  public onClick(target){
    const clickedInside = this._elementRef.nativeElement.contains(target);

    console.log("medio funciona");
    if(!clickedInside){
      this.clickOutside.emit();
    }

  }

}
