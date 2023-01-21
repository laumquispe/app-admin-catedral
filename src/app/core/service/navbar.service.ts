import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipousuario } from '@core/model/tipousuario';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  
  API_URL = `${environment.baseUrl}/tipousuarios`;

  constructor(private http: HttpClient) { }

  getPermisosByTipousuario(tipousuario_id:number): Observable<Tipousuario>{
    return this.http.get<Tipousuario>(`${this.API_URL}/${tipousuario_id}`);
  }
}
