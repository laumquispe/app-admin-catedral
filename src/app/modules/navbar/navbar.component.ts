import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuarioPermiso } from '@core/model/tipousuariopermiso';
import { NavbarService } from '@core/service/navbar.service';
import { AngularTokenService, UserData } from 'angular-token';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 
  user: UserData = {} as UserData; 
  permisos: TipoUsuarioPermiso[] = [];
  hayPedidoEstudios = false;

  constructor(
    private navbarService: NavbarService,   
    private tokenService: AngularTokenService,
    private router: Router) { }

    ngOnInit(): void {
      this.tokenService.validateToken().subscribe(response=>{
        this.user = this.tokenService.currentUserData;
        if (this.user.id) {
          this.getMenu(this.user.tipousuario_id);
        } else {
          this.onLogout();
        }
      });
  
    }
  
    getMenu(tipousuario_id: number) {
      this.navbarService.getPermisosByTipousuario(tipousuario_id).subscribe(tup =>{        
        this.permisos = tup.tipousuario_permiso;        
        console.log('this.permisos',this.permisos);         
       });
    }
  
    onLogout(): void {
      this.tokenService.signOut().subscribe(res => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
        error => console.log(error)
      );
    }
 
}
