import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaNotificarService {


  constructor(private http: HttpClient) {}

  private Url = ''; 

  

  obtenerPersonasANotificar(): Observable<any> {
    return this.http.get(`${this.Url}/endpoint`);
  }

}
