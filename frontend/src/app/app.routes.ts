import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {GradeComponent} from './grade/grade.component';
import {EditTaskComponent} from './edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'grade', component: GradeComponent },
  { path: 'edit/:id', component: EditTaskComponent },
];


