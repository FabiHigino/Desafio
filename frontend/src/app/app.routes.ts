import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {UserDashboardComponent} from './pages/user-dashboard/user-dashboard.component';
import {TasksComponent} from './pages/tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserDashboardComponent },
  { path: 'tasks', component: TasksComponent },

];


