import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  imports: [
    FormsModule,
    NgIf,
    MatButton,
    MatFormField,
    MatInput,
    MatFormFieldModule,
  ],
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  totalUsers: number = 0;
  errorMessage: string = '';

  registerData = { username: '', email: '', password: '' };

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUserCount();
  }

  // Obter total de usuários cadastrados
  getUserCount() {
    this.usersService.getUsers().subscribe(
      (users) => this.totalUsers = users.length,
      (error) => this.errorMessage = 'Erro ao carregar usuários'
    );
  }


  // Cadastro de novo usuário
  registerUser() {
    console.log('Cadastro:', this.registerData);

    this.usersService.register(this.registerData).subscribe(
      (response) => {
        alert('Usuário cadastrado com sucesso!');
        this.getUserCount(); // Atualiza o contador de usuários
      },
      (error) => {
        this.errorMessage = 'Erro ao cadastrar usuário';
        console.error('Erro no cadastro:', error);
      }
    );
  }

}
