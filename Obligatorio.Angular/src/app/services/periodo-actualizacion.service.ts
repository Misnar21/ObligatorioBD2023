import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoActualizacionService {

  private Url = ''; 

  constructor(private http: HttpClient) {}

  obtenerPeriodo(): Observable<any> {
    return this.http.get<any>(`${this.Url}/endpoint`);
  }

  modificarPeriodo(fechaInicio: string, fechaFin: string): Observable<any> {
    const datos = { fechaInicio, fechaFin }; 
    return this.http.post<any>(`${this.Url}/endpoint`, datos);
  }

}
