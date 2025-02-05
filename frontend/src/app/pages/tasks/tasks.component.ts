import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../../model/task';
import {TaskService} from '../../services/tasks.service';
import {TaskFormComponent} from '../task-form/task-form.component';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  imports: [
    NgForOf,
    MatIcon,
    MatFabButton,
    MatButton
  ],
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  tasksByStatus: { [key: string]: Task[] } = {
    '1': [], // A fazer
    '2': [], // Em andamento
    '3': []  // Concluído
  };
  loading: boolean = true;
  error: string = '';

  constructor(private taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.error = '';

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.organizeTasksByStatus();
      },
      error: (err) => {
        this.error = 'Error loading tasks: ' + err.message;
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  organizeTasksByStatus() {
    this.tasksByStatus['1'] = this.tasks.filter(task => task.status === 1);
    this.tasksByStatus['2'] = this.tasks.filter(task => task.status === 2);
    this.tasksByStatus['3'] = this.tasks.filter(task => task.status === 3);
  }

  openTaskDialog(task: Task | null = null) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(id: number) {
    if (confirm("Are you sure to delete?")) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error("Error deleting task:", error);
          alert("Error deleting task. Please try again.");
        }
      });
    }
  }
}
