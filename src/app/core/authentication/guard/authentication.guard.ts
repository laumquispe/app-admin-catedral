import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Subject } from 'rxjs';

import { AngularTokenService } from 'angular-token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  habilitado: boolean = false;

  constructor(private tokenService: AngularTokenService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    
    let resultado: Subject<boolean> = new Subject<boolean>();
    this.tokenService.validateToken().subscribe(
      res => {this.habilitado=true;
              resultado.next(this.habilitado);
              },
      error => {this.habilitado=false;
              resultado.next(this.habilitado);
            }
    )
    return resultado.asObservable();
  }

}
