import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

// 🔹 Definição das rotas
const routes: Routes = [
  { path: '', component: LoginComponent }, // 🔹 Página inicial será o Login
  { path: 'grade', loadComponent: () => import('./grade/grade.component').then(m => m.GradeComponent) } // 🔹 Lazy Loading para a Grade
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule), // ✅ Habilita o HttpClient
    provideRouter(routes), // ✅ Configuração direta das rotas
    provideAnimationsAsync() // ✅ Ativa as animações do Angular
  ]
};
