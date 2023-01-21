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
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled',anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
