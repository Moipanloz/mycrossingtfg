import { ClickOutsideDirective } from 'app/general/clickOutside.directive';
import { CapitalizePipe } from './capitalize.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationService } from './verification.service';
import { PaginacionPipe } from './paginacion.pipe';
import { RoundPipe } from './round.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe,
    RoundPipe
],
  exports: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe,
    RoundPipe
],
  imports: [
    CommonModule
  ],
  providers: [ VerificationService ]
})

export class SharingModule {}
