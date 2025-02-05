import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  imports: [ReactiveFormsModule]
})
export class AddTaskComponent {
  taskForm: FormGroup;
  apiUrl = 'http://localhost:8000/api/tasks/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['To Do']
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      this.http.post(this.apiUrl, this.taskForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao adicionar task:', err)
      });
    }
  }
}
