import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionario';


@Injectable({
  providedIn: 'root',
})
export class FuncionarioService
{
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllFuncionarios = () => this.http.get<Funcionario[]>(this.apiUrl);

  actualizarDatos(datos: any): Observable<any>{
    return this.http.post("http://localhost:3000/usuario/", datos);
  }
}
