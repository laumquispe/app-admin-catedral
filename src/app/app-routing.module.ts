import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '' , redirectTo: 'login', pathMatch: 'full' 
  },
  {
    path: 'login',
    loadChildren: () => import('@module/login/login.module').then(m => m.LoginModule)   
  },
  {
    path: 'caja',
    loadChildren: () => import('@module/caja/caja.module').then(m => m.CajaModule)
  },

  {
    path: 'configuracion',
    loadChildren: () => import('@module/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
  },
  {
    path: 'estadistica',
    loadChildren: () => import('@module/estadistica/estadistica.module').then(m => m.EstadisticaModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled',anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
