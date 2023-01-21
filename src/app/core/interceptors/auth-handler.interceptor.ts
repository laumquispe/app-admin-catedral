import { Injectable } from '@angular/core';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Injectable()
export class AuthHandlerInterceptor implements HttpInterceptor {
    constructor(             
                private modalService: NgbModal,
                private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let token = localStorage.getItem('accessToken');

      if (token) {
        request = request.clone({
              setHeaders: {
                  'api-token': token
              }
          } );
      }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {

            switch(error.status) {
                case 0: {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error: '+error.status+' !!!',
                        text: 'PROBLEMAS DE CONEXION. EL SERVIDOR ESTA FUERA DE LINEA',
                        footer: ''
                      });                    
                    this.router.navigate(['/login']);
                     localStorage.clear();
                   break;
                }

                case 401: {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error: '+error.status+' !!!',
                        text: 'NO AUTORIZADO. Inicie sesión por favor.',
                        footer: ''
                      });                 
                    this.router.navigate(['/login']);
                     localStorage.clear();
                   break;
                }
                case 404: {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error: '+error.status+' !!!',
                        text: 'Problema en el sistema, comuniquese con el Desarrollador.',
                        footer: ''
                      });                      
                     localStorage.clear();
                   break;
                }
                case 500: {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error: '+error.status+' !!!',
                        text: 'PROBLEMAS DE CONEXION. EL SERVIDOR ESTA FUERA DE LINEA',
                        footer: ''
                      });                     
                    this.modalService.dismissAll();
                     localStorage.clear();
                   break;
                }
               }


                return throwError(error);
            }));
    }
}
