import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../public/login/auth/auth-guard.service';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';

const routes: Routes = [
  { path: 'admin/cadastro-servico', component: CadastroServicoComponent, canActivate: [AuthGuardService] },
  { path: 'admin/lista-agendamentos', component: ListaAgendamentoComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }