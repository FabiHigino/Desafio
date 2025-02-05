import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// 🔹 Definição do tipo Task para evitar erros de tipagem
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-grade',
  standalone: true,
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})
export class GradeComponent implements OnInit {
  taskForm: FormGroup;
  tasks: { id: number, title: string, description: string, status: string }[] = [];
  apiUrl = 'http://localhost:8000/api/tasks/'; // 🔹 Endpoint da API de Tasks
  editingTask: Task | null = null; // 🔹 Task que está sendo editada

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  // 🔹 Carrega as tasks do backend
  loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Tasks carregadas:', data); // 🔹 Verifique os dados no console
        this.tasks = data;
      },
      error: (err) => console.error('Erro ao carregar tasks:', err)
    });
  }

  // 🔹 Adiciona ou edita uma task na raia "To Do"
  saveTask(): void {
    if (this.taskForm.valid) {
      const taskData: Task = {
        id: this.editingTask ? this.editingTask.id : 0,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: 'To Do'
      };

      if (this.editingTask) {
        // 🔹 Atualiza a task existente
        this.http.put(`${this.apiUrl}${this.editingTask.id}/`, taskData).subscribe({
          next: () => {
            this.tasks = this.tasks.map(task => task.id === this.editingTask?.id ? taskData : task);
            this.editingTask = null;
            this.taskForm.reset();
          },
          error: (err) => console.error('Erro ao editar task:', err)
        });
      } else {
        // 🔹 Adiciona uma nova task ao backend
        this.http.post<Task>(this.apiUrl, taskData).subscribe({
          next: (task) => {
            this.tasks.push(task);
            this.taskForm.reset();
          },
          error: (err) => console.error('Erro ao adicionar task:', err)
        });
      }
    }
  }

  // 🔹 Edita uma task existente
  editTask(task: Task): void {
    this.editingTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description
    });
  }
}
