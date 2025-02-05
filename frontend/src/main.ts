import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 🔹 Inicializa a aplicação com a configuração centralizada
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
