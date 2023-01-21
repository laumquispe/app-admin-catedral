import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';




const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,   
 
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
