import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'lista-agendamentos', component: ListaAgendamentoComponent },
  { path: 'cadastro-servico', component: CadastroServicoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'agendamento' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
