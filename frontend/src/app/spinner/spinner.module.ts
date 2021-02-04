import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  exports: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SpinnerModule { }
