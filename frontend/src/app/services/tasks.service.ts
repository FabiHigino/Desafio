import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, Comment, WorkedHour } from '../../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/'; // URL base da API

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}tasks/`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}tasks/${id}/`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}tasks/`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}tasks/${id}/`, task); // Use PUT para atualização completa
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}tasks/${id}/`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}comments/`, comment); // Endpoint para comentários
  }

  addWorkedHours(workedHours: WorkedHour): Observable<WorkedHour> {
    return this.http.post<WorkedHour>(`${this.apiUrl}tasks_worked/`, workedHours); // Endpoint para horas trabalhadas
  }

  getCommentsByTask(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}comments/?task=${taskId}`);
  }

  getWorkedHoursByTask(taskId: number): Observable<WorkedHour[]> {
    return this.http.get<WorkedHour[]>(`${this.apiUrl}tasks_worked/?task=${taskId}`);
  }
}
