import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from '../add-task/add-task.component';

// 🔹 Definição do tipo Task
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  comments: string[]; // 🔹 Comentários como array
  hoursWorked: number[]; // 🔹 Horas trabalhadas como array
}

@Component({
  selector: 'app-grade',
  standalone: true,
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    AddTaskComponent
  ]
})
export class GradeComponent implements OnInit {
  tasks: Task[] = []; // 🔹 Lista de tasks
  apiUrl = 'http://localhost:8000/api/tasks/'; // 🔹 Endpoint da API
  newComment: { [taskId: number]: string } = {}; // 🔹 Armazena comentários temporários
  newHours: { [taskId: number]: number } = {}; // 🔹 Armazena horas temporárias

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔹 Carrega as tasks do backend e transforma os dados em arrays
  loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Tasks carregadas:', data);
        this.tasks = data.map(task => ({
          ...task,
          comments: task.comments || [], // 🔹 Garante que sempre seja um array
          hoursWorked: task.hoursWorked || [] // 🔹 Garante que sempre seja um array
        }));
      },
      error: (err) => console.error('Erro ao carregar tasks:', err)
    });
  }

  // 🔹 Adiciona um comentário a uma task
  addComment(task: Task): void {
    if (this.newComment[task.id]?.trim()) {
      task.comments.push(this.newComment[task.id]); // 🔹 Adiciona o comentário ao array

      this.http.put(`${this.apiUrl}${task.id}/`, task).subscribe({
        next: () => {
          console.log('Comentário adicionado.');
          this.newComment[task.id] = ''; // 🔹 Limpa o input
        },
        error: (err) => console.error('Erro ao adicionar comentário:', err)
      });
    }
  }

  // 🔹 Adiciona horas trabalhadas a uma task
  addHours(task: Task): void {
    if (this.newHours[task.id] > 0) {
      task.hoursWorked.push(this.newHours[task.id]); // 🔹 Adiciona as horas ao array

      this.http.put(`${this.apiUrl}${task.id}/`, task).subscribe({
        next: () => {
          console.log('Horas adicionadas.');
          this.newHours[task.id] = 0; // 🔹 Limpa o input
        },
        error: (err) => console.error('Erro ao adicionar horas:', err)
      });
    }
  }
}
