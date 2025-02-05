import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

// 🔹 Definição do tipo Task (todos os valores são strings)
interface Task {
  id: string; // 🔹 ID como string
  title: string;
  description: string;
  status: string;
  comments: string[]; // 🔹 Comentários como array de strings
  hoursWorked: string[]; // 🔹 Horas trabalhadas como array de strings
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
    FormsModule
  ]
})
export class GradeComponent implements OnInit {
  tasks: Task[] = []; // 🔹 Lista de tasks vinda da API
  apiUrl = 'http://localhost:8000/api/tasks/'; // 🔹 Endpoint da API
  editingTask: Task | null = null; // 🔹 Guarda a task que está sendo editada
  newComment: string = '';
  newHours: string = '';

  // 🔹 Formulário para adicionar nova task
  newTask = {
    title: '',
    description: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔹 Carrega as tasks do backend e garante que tudo seja string
  loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Tasks carregadas:', data);
        this.tasks = data.map(task => ({
          ...task,
          id: String(task.id),
          comments: task.comments ? task.comments.map(String) : [],
          hoursWorked: task.hoursWorked ? task.hoursWorked.map(String) : []
        }));
      },
      error: (err) => console.error('Erro ao carregar tasks:', err)
    });
  }

  // 🔹 Adiciona uma nova task
  addTask(): void {
    if (this.newTask.title.trim()) {
      const taskData: Task = {
        id: '',
        title: this.newTask.title,
        description: this.newTask.description,
        status: 'To Do', // 🔹 Começa sempre na primeira raia
        comments: [],
        hoursWorked: []
      };

      this.http.post<Task>(this.apiUrl, taskData).subscribe({
        next: (task) => {
          console.log('Task adicionada:', task);
          this.tasks.push(task);
          this.newTask = { title: '', description: '' };
        },
        error: (err) => console.error('Erro ao adicionar task:', err)
      });
    }
  }

  // 🔹 Move uma task para um novo status
  moveTask(task: Task, newStatus: string): void {
    task.status = newStatus;

    this.http.put(`${this.apiUrl}${task.id}/`, task).subscribe({
      next: () => console.log(`Task movida para ${newStatus}`),
      error: (err) => console.error('Erro ao mover task:', err)
    });
  }

  // 🔹 Adiciona um comentário
  addComment(task: Task): void {
    if (this.newComment.trim()) {
      task.comments.push(this.newComment);

      this.http.put(`${this.apiUrl}${task.id}/`, task).subscribe({
        next: () => console.log('Comentário adicionado com sucesso!'),
        error: (err) => console.error('Erro ao adicionar comentário:', err)
      });

      this.newComment = '';
    }
  }

  // 🔹 Adiciona horas trabalhadas
  addHours(task: Task): void {
    if (this.newHours.trim()) {
      task.hoursWorked.push(this.newHours);

      this.http.put(`${this.apiUrl}${task.id}/`, task).subscribe({
        next: () => console.log('Horas adicionadas com sucesso!'),
        error: (err) => console.error('Erro ao adicionar horas:', err)
      });

      this.newHours = '';
    }
  }
}
