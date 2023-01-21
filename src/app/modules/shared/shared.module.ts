import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ButtonPrintComponent } from './button-print/button-print.component';
import { DynamicComponent } from './dynamic/dynamic.component';


@NgModule({
  declarations: [ButtonPrintComponent, DynamicComponent],
  entryComponents: [
    ButtonPrintComponent,
    DynamicComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    ButtonPrintComponent,
    DynamicComponent

  ]
})
export class SharedModule { }
