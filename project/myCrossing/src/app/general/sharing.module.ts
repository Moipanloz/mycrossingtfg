import { ClickOutsideDirective } from 'app/general/clickOutside.directive';
import { CapitalizePipe } from './capitalize.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationService } from './verification.service';
import { PaginacionPipe } from './paginacion.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe
],
  exports: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe
],
  imports: [
    CommonModule
  ],
  providers: [ VerificationService ]
})

export class SharingModule {}
