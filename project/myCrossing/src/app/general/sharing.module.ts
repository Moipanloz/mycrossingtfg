import { ClickOutsideDirective } from 'app/general/directives/clickOutside.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationService } from './services/verification.service';
import { PaginacionPipe } from './pipes/paginacion.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { FiltroAcPipe } from './pipes/filtro-ac.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe,
    RoundPipe,
    FiltroAcPipe
],
  exports: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe,
    RoundPipe,
    FiltroAcPipe
],
  imports: [
    CommonModule
  ],
  providers: [ VerificationService ]
})

export class SharingModule {}
