import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthHandlerInterceptor } from './interceptors/auth-handler.interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule       
      
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHandlerInterceptor,
            multi: true
        }
        ]
})
export class CoreModule { }
