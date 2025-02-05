import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../model/task';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/api/comments/';

  constructor(private http: HttpClient) {}

  getComment(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }
}
