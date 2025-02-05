import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

// 🔹 Definir as rotas
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'quadro', loadComponent: () => import('./grade/grade.component').then(m => m.GradeComponent) }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // 🔥 Configura o roteamento sem app.module.ts
    provideHttpClient()    // 🔥 Ativa o HttpClient sem app.module.ts
  ]
};
