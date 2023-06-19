import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CajaMensual } from '@core/model/cajamensual';

@Injectable({
  providedIn: 'root'
})
export class CajamensualService {

  API_URL = `${environment.baseUrl}/cajamensuales`;

  constructor(private http: HttpClient) { }


  createCajaMensual(registro: CajaMensual): Observable<any> {
    return this.http.post<CajaMensual>(this.API_URL, registro);
  }

  getLastCajaMensual(): Observable<CajaMensual> {
    const url = `${environment.baseUrl}/lastcierremensual`;
    return this.http.get<CajaMensual>(url);
  }

  getCajaMensualByPeriodo(periodo:string): Observable<CajaMensual[]> {
    let params = new HttpParams();
    params = params.set('periodo', periodo);     
    const url = `${environment.baseUrl}/getcajamensualbyperiodo`;
    return this.http.get<any>(url, {params});
  }

  getCajaMensualByAnio(anio:string): Observable<CajaMensual[]> {
    let params = new HttpParams();
    params = params.set('anio', anio);     
    const url = `${environment.baseUrl}/getcajamensualbyanio`;
    return this.http.get<any>(url, {params});
  }
  


}
