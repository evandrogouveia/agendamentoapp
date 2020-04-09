import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
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
