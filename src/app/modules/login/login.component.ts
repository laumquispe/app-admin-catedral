import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularTokenService, SignInData, UserData } from 'angular-token';
import { Tipousuario } from 'src/app/core/model/tipousuario';


@Component({
  selector: '',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(
    private tokenService: AngularTokenService,  
    private router: Router
  ) { }

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }


  onLogin(form: SignInData) {
    this.tokenService.signIn(form).subscribe(response => {
      const user: UserData = this.tokenService.currentUserData;
      switch (user.tipousuario_id) {
        case Tipousuario.ADMINISTRADOR: {    
            this.router.navigate(['caja/cajageneral']);        
          break;
        }                
        default:        
            this.router.navigate(['caja/cajageneral']);
         
      }

    }, (error: Error) => {
      //mostrar mensaje
    });
  }
 
}
