import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  templateUrl: './edit-task.component.html',
  imports: [ReactiveFormsModule, MatCard, MatCardTitle, MatFormField, MatInput, MatButton]
})
export class EditTaskComponent {
  taskForm: FormGroup;
  apiUrl = 'http://localhost:8000/api/tasks/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // 🔹 Certifique-se de injetar os dados corretamente
  ) {
    if (!data || !data.task) {
      console.error("Erro: Nenhuma tarefa recebida no diálogo!");
      this.dialogRef.close();
      return;
    }

    this.taskForm = this.fb.group({
      title: [data.task.title, Validators.required],
      description: [data.task.description],
      comments: [data.task.comments || []],
      hoursWorked: [data.task.hoursWorked || 0]
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      this.http.put(`${this.apiUrl}${this.data.task.id}/`, this.taskForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao editar task:', err)
      });
    }
  }
}
