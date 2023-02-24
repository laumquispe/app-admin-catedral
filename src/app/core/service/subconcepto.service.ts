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


  getAllSubconceptosByConcepto(concepto_id: number): Observable<Subconcepto[]> {
    return this.http.get<Subconcepto[]>(`${this.API_URL}?concepto_id=${concepto_id}`);
  }


  getSubconceptosByConcepto(concepto_id: number): Observable<Subconcepto[]> {
    const url = `${environment.baseUrl}/getsubconceptobyconcepto?concepto_id=${concepto_id}`;
    return this.http.get<Subconcepto[]>(url);
  }

  addSubconcepto(subconcepto: Subconcepto): Observable<any> {
    return this.http.post<Subconcepto>(this.API_URL, subconcepto);
  }

  updateSubconcepto(subconcepto: Subconcepto): Observable<any> {
    const url = `${this.API_URL}/${subconcepto.id}`;
    return this.http.put(url, subconcepto);
  }

  updateByConcepto(concepto_id:number,activo:boolean): Observable<any> {   
    const url = `${environment.baseUrl}/updatebyconcepto`;
    return this.http.put<Subconcepto>(url, { concepto_id: concepto_id,activo:activo });  
  }
}
