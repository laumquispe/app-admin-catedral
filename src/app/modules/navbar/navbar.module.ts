import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


const myModule = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatSelectModule,
  MatListModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    myModule
  ],
  exports: [myModule]
})
export class NavbarModule { }
