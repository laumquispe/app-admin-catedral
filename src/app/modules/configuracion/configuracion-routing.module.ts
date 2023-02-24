import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadocuentaComponent } from './listadocuenta/listadocuenta.component';

const routes: Routes = [
  {
    path: 'listadocuenta',
    component: ListadocuentaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
