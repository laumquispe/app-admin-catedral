import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoComprobante } from '@core/model/tipocomprobante';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipocomprobanteService {

  API_URL = `${environment.baseUrl}/tipocomprobantes`;

  constructor(private http: HttpClient) { }

  getTipoComprobantes(): Observable<TipoComprobante[]> {
    return this.http.get<TipoComprobante[]>(this.API_URL);
  }
}
