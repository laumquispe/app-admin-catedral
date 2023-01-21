import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'administracion-app';
 
  myForm = false;
  constructor(public tokenService: AngularTokenService) {}


  openForm() {
    this.myForm = true;
  }
  
  closeForm() {
    this.myForm = false;
  }
}
