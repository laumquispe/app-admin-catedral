import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ListaproveedorComponent } from './listaproveedor/listaproveedor.component';


@NgModule({
  declarations: [
    ListaproveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule
  ]
})
export class ProveedorModule { }
