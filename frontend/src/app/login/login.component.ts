import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // 🔥 Standalone sem app.module.ts
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
  ]
})
export class LoginComponent {
  loginFormulario: FormGroup;
  cadastroFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // 🔹 Inicializa o formulário de Login
    this.loginFormulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });

    // 🔹 Inicializa o formulário de Cadastro
    this.cadastroFormulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 🔹 Login: Redireciona para a Grade
  onLogin(): void {
    if (this.loginFormulario.valid) {
      console.log('Login efetuado!');
      this.router.navigate(['/grade']);
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  // 🔹 Cadastro: Apenas exibe uma mensagem por enquanto
  onCadastrar(): void {
    if (this.cadastroFormulario.valid) {
      console.log('Cadastro efetuado!', this.cadastroFormulario.value);
      alert("Cadastro realizado com sucesso!");
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
}
