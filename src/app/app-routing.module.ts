import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentoComponent } from './cliente/agendamento/agendamento.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { RegistroComponent } from './registro/registro.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuardService] },
  { path: 'recover', component: EsqueciSenhaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
