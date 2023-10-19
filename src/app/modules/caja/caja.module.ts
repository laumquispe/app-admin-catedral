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



@NgModule({
  declarations: [CajageneralComponent, EditregistrocajaComponent, DialogregistrocajaComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,    
    FormsModule,
    NgbModule,
    MaterialModule,
    MatTableExporterModule,
    SharedModule,
    ReactiveFormsModule   
  ]
})
export class CajaModule { }
