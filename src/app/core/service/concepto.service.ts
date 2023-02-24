import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Concepto } from '@core/model/concepto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  API_URL = `${environment.baseUrl}/conceptos`;

  constructor(private http: HttpClient) { }

  getConceptosCaja(): Observable<Concepto[]> {
    return this.http.get<Concepto[]>(this.API_URL);
  }

  getConceptosByTipoRegistro(tiporegistro_id: number): Observable<Concepto[]> {
    const url = `${environment.baseUrl}/getconceptobytiporegistro?tiporegistro_id=${tiporegistro_id}`;
    return this.http.get<Concepto[]>(url);
  }

  addConcepto(concepto: Concepto): Observable<any> {
    return this.http.post<Concepto>(this.API_URL, concepto);
  }

  updateConcepto(concepto: Concepto): Observable<any> {
    const url = `${this.API_URL}/${concepto.id}`;
    return this.http.put(url, concepto);
  }

  

}
