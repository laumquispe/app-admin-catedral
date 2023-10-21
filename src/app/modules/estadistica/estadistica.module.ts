import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { ReportesComponent } from './reportes/reportes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@module/shared/material.module';
import { SharedModule } from '@module/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberFormatPipe } from '@core/library/number.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPrintModule } from 'ngx-print';





@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    EstadisticaRoutingModule,
    FormsModule,
    NgbModule,   
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxPrintModule
   
  ],
  providers: [ NumberFormatPipe]
})
export class EstadisticaModule { }
