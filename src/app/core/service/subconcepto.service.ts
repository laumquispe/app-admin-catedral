import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subconcepto } from '@core/model/subconcepto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubconceptoService {

  API_URL = `${environment.baseUrl}/subconceptos`;

  constructor(private http: HttpClient) { }

  getSubconceptosCaja(): Observable<Subconcepto[]> {
    return this.http.get<Subconcepto[]>(this.API_URL);
  }

  getSubconceptosByConcepto(concepto_id: number): Observable<Subconcepto[]> {
    const url = `${environment.baseUrl}/getsubconceptobyconcepto?concepto_id=${concepto_id}`;
    return this.http.get<Subconcepto[]>(url);
  }
}
