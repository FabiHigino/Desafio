import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../model/comments';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {
  }

  //usuarios

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}users/`);
  }

  createUsuario(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users/`, userData);
  }

  //tarefas

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}tasks/`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}tasks/${id}/`);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}tasks/${id}/`, task);
  }

  createTasks(taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}tasks/`, taskData);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}tasks/${taskId}/`);
  }

  //comentarios

  addComment(comment: Comments): Observable<any> {
    return this.http.post('/api/comments', comment); // Ajuste o endpoint
  }

  getCommentsByTask(taskId: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`/api/comments?task=${taskId}`); // Ajuste o endpoint
  }
}
