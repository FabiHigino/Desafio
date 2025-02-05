import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule]
})
export class AddTaskComponent {
  taskForm: FormGroup;
  apiUrl = 'http://localhost:8000/api/tasks/'; // 🔹 Endpoint da API

  @Output() taskAdded = new EventEmitter<void>(); // 🔹 Dispara evento para atualizar a Grade

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  // 🔹 Envia a nova task para a API
  addTask(): void {
    if (this.taskForm.valid) {
      const taskData = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: 'To Do'
      };

      this.http.post(this.apiUrl, taskData).subscribe({
        next: () => {
          this.taskForm.reset(); // 🔹 Limpa o formulário
          this.taskAdded.emit(); // 🔹 Notifica o `GradeComponent` para atualizar a lista
        },
        error: (err) => console.error('Erro ao adicionar task:', err)
      });
    }
  }
}
