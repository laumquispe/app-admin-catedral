import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URL = `${environment.baseUrl}/usuarios`;

  BASE_URL = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}`);
  }

  //trae la agenda segun ID 
  getprofesional(agenda_id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}/getprofesional?id=${agenda_id}`);
  }

 //trae todos los usuarios con  agenda
  getUsuariosAgenda(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.BASE_URL}/getusuariosagenda`);
  }

  //trae todos los usuarios con tipo usuario servicio
  getUsuariosAgendaServicio(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.BASE_URL}/getagendaservicios`);
  }

  //trae la rendicion por secretario
  getRendicionBySecretario(usuario_id: number,fechadesde: string): Observable<any> {  
    let params = new HttpParams();
    params = params.set('fechadesde', fechadesde);
    params = params.set('usuario_id', usuario_id.toString());
    const url = `${this.BASE_URL}/secretariorendicion`;
    return this.http.get<any>(url, {params});
  }


  getRendicionByProfesional(profesional_id: number,fechadesde: string,fechahasta: string): Observable<any> {  
    let params = new HttpParams();
    params = params.set('fechadesde', fechadesde);
    params = params.set('fechahasta', fechahasta);
    params = params.set('profesional_id', profesional_id.toString());
    const url = `${this.BASE_URL}/profesionalrendicion`;
    return this.http.get<any>(url, {params});
  }



}
