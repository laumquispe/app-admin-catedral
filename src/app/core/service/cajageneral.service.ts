import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CajaGeneral } from '../model/cajageneral';

@Injectable({
  providedIn: 'root'
})
export class CajageneralService {

  API_URL = `${environment.baseUrl}/cajagenerales`;

  constructor(private http: HttpClient) { }


  createCajaGeneral(registro: CajaGeneral): Observable<any> {
    return this.http.post<CajaGeneral>(this.API_URL, registro);
  }

  getRegistrosCaja(): Observable<CajaGeneral[]> {
    const url = `${this.API_URL}`;
    return this.http.get<CajaGeneral[]>(url);
  }

  getRegistrosCajaByFechas(fechadesde?: string | null,fechahasta?: string | null, concepto_id?:number,subconcepto_id?:number,formapago_id?:number): Observable<any> {  
    let params = new HttpParams();
    params = params.set('fechadesde', fechadesde?fechadesde:'');
    params = params.set('fechahasta', fechahasta?fechahasta:''); 
    params = params.set('concepto_id',  concepto_id?concepto_id.toString():'null');
    params = params.set('subconcepto_id', subconcepto_id?subconcepto_id.toString(): 'null');
    params = params.set('formapago_id', formapago_id?formapago_id.toString():'null');   
    const url = `${environment.baseUrl}/getregistroscajabyRangofecha`;
    return this.http.get<any>(url, {params});
  }

  updateRegistroCaja(registro: CajaGeneral): Observable<any> {  
    const url = `${this.API_URL}/${registro.id}`;
    return this.http.put(url, registro);
  }

  updateRegistroCajaCancelar(registro: CajaGeneral): Observable<any> {  
    const url = `${environment.baseUrl}/updateregistrocanceled`;
    return this.http.put(url, registro);
  }

  getLastRegistrosCaja(): Observable<CajaGeneral> {
    const url = `${environment.baseUrl}/lastregistro`;
    return this.http.get<CajaGeneral>(url);
  }

  getSumRegistros(): Observable<any[]> {
    const url = `${environment.baseUrl}/sumregistros`;
    return this.http.get<any[]>(url);
  }

  getRegistrosCajaByMes(fechahasta?: string | null): Observable<any> {  
    let params = new HttpParams();
    params = params.set('fechahasta', fechahasta?fechahasta:'');     
    const url = `${environment.baseUrl}/getregistroscajabyrangomes`;
    return this.http.get<any>(url, {params});
  }
  
  updateRegistrosCajaByMes(registroids: any, usuario_id:number): Observable<any> {   
    const url = `${environment.baseUrl}/updateregistroscajabymes`;
    return this.http.put<CajaGeneral>(url, { registroids: registroids, usuario_id:usuario_id});  
  }


}
