import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionario';


@Injectable({
  providedIn: 'root',
})
export class FuncionarioService
{
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getAllFuncionarios = () => this.http.get<Funcionario[]>(this.apiUrl);
}
