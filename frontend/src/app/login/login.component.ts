import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    RouterLink,
    HttpClientModule // 🔹 Importa o módulo HTTP para fazer requisições
  ]
})
export class LoginComponent {
  loginFormulario: FormGroup;
  cadastroFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient // 🔹 Injeta o serviço HttpClient para requisições
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

  // 🔹 Cadastro: Envia os dados para a API e retorna à tela de login
  onCadastrar(): void {
    if (this.cadastroFormulario.valid) {
      const dadosCadastro = {
        username: this.cadastroFormulario.value.nome, // 🔹 Alterado para "username"
        email: this.cadastroFormulario.value.email,
        password: this.cadastroFormulario.value.senha // 🔹 Alterado para "password"
      };

      // 🔹 Faz a requisição POST para salvar os dados no backend
      this.http.post('http://localhost:8000/api/users/', dadosCadastro).subscribe({
        next: (res) => {
          console.log('Cadastro realizado com sucesso:', res);
          alert("Cadastro realizado com sucesso! Agora faça login para continuar.");
          this.cadastroFormulario.reset(); // 🔹 Limpa o formulário após o cadastro
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);

          // 🔹 Exibe o erro retornado pelo backend no alert
          if (err.status === 400) {
            alert("Erro ao cadastrar: " + JSON.stringify(err.error));
          } else {
            alert("Erro ao cadastrar. Verifique sua conexão e tente novamente.");
          }
        }
      });

    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
}
