import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../public/login/auth/auth-guard.service';
import { RegisterSalonServiceComponent } from './register-salon-service/register-salon-service.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';

const routes: Routes = [
  { path: 'admin/cadastro-servico', component: RegisterSalonServiceComponent, canActivate: [AuthGuardService] },
  { path: 'admin/lista-agendamentos', component: ListScheduleComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }