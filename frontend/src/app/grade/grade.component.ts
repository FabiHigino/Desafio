import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grade',
  standalone: true, // 🔥 Permite carregar sem app.module.ts
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
  imports: [CommonModule]
})
export class GradeComponent { }
