import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '@core/model/report';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  API_URL = `${environment.baseUrl}/templates`;
  isEdit = false;
  reportId = 0;

  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get(url);
  }

  getAll(): Observable<any> {
    const url = `${this.API_URL}`;
    return this.http.get(url);
  }

  save(report: Report): Observable<any> {
    if (!report.id) {
      return this.http.post<Report>(this.API_URL, { ...report });
    }
    return this.update(report);
  }

  update(report: Report): Observable<any> {
    return this.http.put<Report>(`${this.API_URL}/${report.id}`, { ...report });
  }

  delete(id: number): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
