import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CajageneralComponent } from './cajageneral/cajageneral.component';

const routes: Routes = [
  {
    path: 'cajageneral',
    component: CajageneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
