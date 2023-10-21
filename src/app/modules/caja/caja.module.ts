import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { CajageneralComponent } from './cajageneral/cajageneral.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@module/shared/material.module';
import { SharedModule } from '@module/shared/shared.module';
import { EditregistrocajaComponent } from './editregistrocaja/editregistrocaja.component';
import { DialogregistrocajaComponent } from './dialogregistrocaja/dialogregistrocaja.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DateFormatDirective } from './directivesdate/DateFormatDirective';
import { YearMonthFormatDirective } from './directivesdate/YearMonthFormatDirective';
import { MatMomentDateModule } from '@angular/material-moment-adapter';



@NgModule({
  declarations: [CajageneralComponent, EditregistrocajaComponent, DialogregistrocajaComponent, 
    YearMonthFormatDirective],
  imports: [
    CommonModule,
    CajaRoutingModule,    
    FormsModule,
    NgbModule,
    MaterialModule,
    MatTableExporterModule,
    SharedModule,
    ReactiveFormsModule,
    MatMomentDateModule   
  ]
})
export class CajaModule { }
