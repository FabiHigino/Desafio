import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import {WorkedHour, Task, Comment} from '../../../model/task';
import {TaskService} from '../../services/tasks.service';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button'; // Importe o UsersService

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    NgIf,
    NgForOf,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatFormFieldModule,
  ],
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;
  isEditing: boolean = false;
  comments: Comment[] = [];
  workedHours: WorkedHour[] = [];
  newCommentText: string = '';
  newWorkedHours: number = 0;
  users: any[] = []; // Array para armazenar os usuários

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService,
    private fb: FormBuilder,
    private usersService: UsersService // Injete o UsersService
  ) { }

  ngOnInit(): void {
    this.isEditing = !!this.data;

    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      planned_hours: ['', Validators.required],
      status: ['', Validators.required],
      owner: ['', Validators.required] // Campo owner agora é obrigatório
    });

    if (this.isEditing) {
      this.taskForm.patchValue(this.data);
      this.loadCommentsAndWorkedHours(this.data.id);
    }

    this.loadUsers(); // Carrega os usuários ao inicializar o componente
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadCommentsAndWorkedHours(taskId: number) {
    this.taskService.getCommentsByTask(taskId).subscribe(comments => this.comments = comments);
    this.taskService.getWorkedHoursByTask(taskId).subscribe(workedHours => this.workedHours = workedHours);
  }

  addTask() {
    if (this.isEditing) {
      this.taskService.updateTask(this.data.id, this.taskForm.value).subscribe(() => this.dialogRef.close());
    } else {
      this.taskService.createTask(this.taskForm.value).subscribe(() => this.dialogRef.close());
    }
  }

  addComment() {
    const comment: Comment = {
      text: this.newCommentText,
      task: this.data.id,
      user: 1 // Substituir pelo ID do usuário logado
    };
    this.taskService.addComment(comment).subscribe(newComment => {
      this.comments.push(newComment);
      this.newCommentText = '';
    });
  }

  addWorkedHours() {
    const workedHours: WorkedHour = {
      hours: this.newWorkedHours,
      date: new Date().toISOString().slice(0, 10), // Formato YYYY-MM-DD
      task: this.data.id,
      user: 1 // Substituir pelo ID do usuário logado
    };
    this.taskService.addWorkedHours(workedHours).subscribe(newWorkedHours => {
      this.workedHours.push(newWorkedHours);
      this.newWorkedHours = 0;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
