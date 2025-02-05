import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // 🔥 Permite rodar sem app.module.ts
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ]
})
export class LoginComponent {
  loginFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginFormulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.loginFormulario.valid) {
      const email = this.loginFormulario.value.email;

      this.http.get<any[]>('http://localhost:8000/api/users/').subscribe({
        next: (users) => {
          const userExists = users.some(user => user.email === email);

          if (userExists) {
            console.log('Login bem-sucedido!');
            this.router.navigate(['/grade']); // 🔹 Redireciona para a GradeComponent
          } else {
            console.error('Email não encontrado');
          }
        },
      });
    }
  }
}
