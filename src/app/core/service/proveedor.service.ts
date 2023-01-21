import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '@core/model/proveedor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  API_URL = `${environment.baseUrl}/proveedores`;

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.API_URL);
  }
}
