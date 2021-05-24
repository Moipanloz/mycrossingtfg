import { ClickOutsideDirective } from 'app/general/directives/clickOutside.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationService } from './services/verification.service';
import { PaginacionPipe } from './pipes/paginacion.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { FiltroAcPipe } from './pipes/filtro-ac.pipe';
import { FiltroCategoriaCmPipe } from 'app/cat-criaturas-marinas/filtro-categoria-cm.pipe';
import { TraducirCmPipe } from 'app/cat-criaturas-marinas/traducir-cm.pipe';
import { FiltroCategoriaPipe } from 'app/cat-insectos/filtro-categoria.pipe';
import { MesesTextualesPipe } from 'app/cat-insectos/meses-textuales.pipe';
import { TraducirPipe } from 'app/cat-insectos/traducir.pipe';
import { FiltroCategoriaPezPipe } from 'app/cat-peces/filtro-categoria-pez.pipe';
import { TraducirPezPipe } from 'app/cat-peces/traducir-pez.pipe';
import { CazablePipe } from '../cazar-ahora/cat-caza-insectos/cazable.pipe';
import { VecinosPipe } from 'app/perfil/misvecinos/vecinos.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe,
    RoundPipe,
    FiltroAcPipe,
    FiltroCategoriaCmPipe,
    TraducirCmPipe,
    TraducirPezPipe,
    FiltroCategoriaPezPipe,
    TraducirPipe,
    MesesTextualesPipe,
    FiltroCategoriaPipe,
    CazablePipe,
    VecinosPipe
],
  exports: [
    CapitalizePipe,
    ClickOutsideDirective,
    PaginacionPipe,
    RoundPipe,
    FiltroAcPipe,
    FiltroCategoriaCmPipe,
    TraducirCmPipe,
    TraducirPezPipe,
    FiltroCategoriaPezPipe,
    TraducirPipe,
    MesesTextualesPipe,
    FiltroCategoriaPipe,
    CazablePipe,
    VecinosPipe
],
  imports: [
    CommonModule
  ],
  providers: [ VerificationService ]
})

export class SharingModule {}
