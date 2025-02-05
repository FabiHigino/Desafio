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
          id: String(task.id), // 🔹 Garante que ID seja uma string
          comments: task.comments ? task.comments.map(String) : [], // 🔹 Converte tudo para string
          hoursWorked: task.hoursWorked ? task.hoursWorked.map(String) : [] // 🔹 Converte tudo para string
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
        status: 'To Do',
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

  // 🔹 Ativa o modo de edição de uma task
  editTask(task: Task): void {
    this.editingTask = { ...task }; // 🔹 Clona a task para edição
  }

  // 🔹 Salva a task editada corretamente no array e na API
  saveTask(): void {
    if (this.editingTask) {
      this.http.put(`${this.apiUrl}${this.editingTask.id}/`, this.editingTask).subscribe({
        next: (updatedTask: Task) => {
          const index = this.tasks.findIndex(t => t.id === this.editingTask?.id);
          if (index !== -1) {
            this.tasks[index] = { ...updatedTask }; // 🔹 Substitui a task editada na lista
          }
          this.editingTask = null;
          console.log('Task atualizada com sucesso!');
        },
        error: (err) => console.error('Erro ao atualizar task:', err)
      });
    }
  }

  // 🔹 Adiciona um comentário
  addComment(task: Task): void {
    if (this.newComment.trim()) {
      task.comments.push(this.newComment);

      this.http.put(`${this.apiUrl}${task.id}/`, task).subscribe({
        next: () => {
          console.log('Comentário adicionado com sucesso!');
          this.newComment = ''; // 🔹 Limpa o input
        },
        error: (err) => console.error('Erro ao adicionar comentário:', err)
      });
    }
  }

  // 🔹 Adiciona horas trabalhadas
  addHours(task: Task): void {
    if (this.newHours.trim()) {
      task.hoursWorked.push(this.newHours);

      this.http.put(`${this.apiUrl}${task.id}/`, task).subscribe({
        next: () => {
          console.log('Horas adicionadas com sucesso!');
          this.newHours = ''; // 🔹 Limpa o input
        },
        error: (err) => console.error('Erro ao adicionar horas:', err)
      });
    }
  }
}
