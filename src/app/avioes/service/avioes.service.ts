import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Aviao } from '../model/aviao';

@Injectable({
  providedIn: 'root'
})
export class AvioesService {
  private API_URL = "http://localhost:3000/avioes"

  constructor(private httpClient:HttpClient) { }

  // Carregar aviões (paginator)
  list(page: number = 1, size: number = 4): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}?_page=${page}&_per_page=${size}`);
  }

  // Criar avião
  create(aviao: Aviao): Observable<Aviao> {
    return this.httpClient.post<Aviao>(this.API_URL, aviao);
  }

  // Atualizar avião
  update(aviao: Aviao): Observable<Aviao> {
    return this.httpClient.put<Aviao>(`${this.API_URL}/${aviao.id}`, aviao);
  }

  // Deletar avião
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${id}`);
  }
  
}
