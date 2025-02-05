import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common'; // Import NgFor
import { MatButtonModule } from '@angular/material/button'; // Import Material Button
import { MatListModule } from '@angular/material/list';   // Import Material List
import { MatInputModule } from '@angular/material/input'; // Import Material Input
import { MatFormFieldModule } from '@angular/material/form-field'; // Import Material Form Field
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
})
export class UserDashboardComponent implements OnInit {
  totalUsers: number = 0;
  errorMessage: string = '';
  registerData = { username: '', email: '', password: '' };

  showNames: boolean = false;
  userNames: any[] = [];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.getUserCount();
  }

  getUserCount() {
    this.usersService.getUsers().subscribe(
      (users) => (this.totalUsers = users.length),
      (error) => (this.errorMessage = 'Erro ao carregar usuários')
    );
  }

  registerUser() {
    this.usersService.register(this.registerData).subscribe(
      (response) => {
        alert('Usuário cadastrado com sucesso!');
        this.getUserCount();
        this.registerData = { username: '', email: '', password: '' }; // Limpa o formulário
      },
      (error) => (this.errorMessage = 'Erro ao cadastrar usuário')
    );
  }

  showUserNames() {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.userNames = users;
        this.showNames = true;
      },
      (error) => (this.errorMessage = 'Erro ao carregar usuários')
    );
  }
}
