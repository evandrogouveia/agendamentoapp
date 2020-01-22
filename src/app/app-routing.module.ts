import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';

const routes: Routes = [
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
