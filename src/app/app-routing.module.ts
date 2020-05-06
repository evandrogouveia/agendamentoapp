import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentoComponent } from './cliente/agendamento/agendamento.component';
import { CadastroServicoComponent } from './admin/cadastro-servico/cadastro-servico.component';
import { ListaAgendamentoComponent } from './admin/lista-agendamento/lista-agendamento.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuardService] },
  { path: 'lista-agendamentos', component: ListaAgendamentoComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro-servico', component: CadastroServicoComponent, canActivate: [AuthGuardService] },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
