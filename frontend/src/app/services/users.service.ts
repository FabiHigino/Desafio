import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/api/users/';

  constructor(private http: HttpClient) {}

  // Obter todos os usuários
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Cadastrar usuário
  register(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }
}
