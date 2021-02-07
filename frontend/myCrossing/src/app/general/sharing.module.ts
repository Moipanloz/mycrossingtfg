import { ClickOutsideDirective } from 'app/general/clickOutside.directive';
import { CapitalizePipe } from './capitalize.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationService } from './verification.service';

@NgModule({
  declarations: [
    CapitalizePipe,
    ClickOutsideDirective
],
  exports: [
    CapitalizePipe,
    ClickOutsideDirective
],
  imports: [
    CommonModule
  ],
  providers: [ VerificationService ]
})

export class SharingModule {}
