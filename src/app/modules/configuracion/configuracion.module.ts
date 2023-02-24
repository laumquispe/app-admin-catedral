import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ListadocuentaComponent } from './listadocuenta/listadocuenta.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@module/shared/material.module';


@NgModule({
  declarations: [
    CuentaComponent,
    ListadocuentaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ConfiguracionRoutingModule
  ]
})
export class ConfiguracionModule { }
