import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPago } from '../model/formapago';

@Injectable({
  providedIn: 'root'
})
export class FormapagoService {

  
  API_URL = `${environment.baseUrl}/formapagos`;

  constructor(private http: HttpClient) { }

  getFormaPagos(): Observable<FormaPago[]> {
    return this.http.get<FormaPago[]>(this.API_URL);
  }

  getFormaPago(formapago_id : number): Observable<FormaPago> {
    return this.http.get<FormaPago>(`${this.API_URL}/${formapago_id}`);
  }

}
