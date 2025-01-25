import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';
import { Aviao } from '../model/aviao';

@Injectable({
  providedIn: 'root'
})
export class AvioesService {
  private API_URL = "http://localhost:3000/produtos"

  constructor(private httpClient:HttpClient) { }

  list():Observable<Aviao[]>{
    return this.httpClient.get<Aviao[]>(this.API_URL)
    .pipe(
    first(),
    tap(p => console.log(p))
    )
  }
}
