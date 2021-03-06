import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/auth/auth-guard.service';
import { RegistroComponent } from './registro/registro.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { SucessoComponent } from './cliente/sucesso/sucesso.component';
import { PerfilClienteComponent } from './cliente/perfil-cliente/perfil-cliente.component';
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  //{ path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuardService] },
  { path: 'sucesso', component: SucessoComponent },
  { path: 'perfil', component: PerfilClienteComponent, canActivate: [AuthGuardService] },
  { path: 'perfil/editar/:id', component: EditarPerfilComponent, canActivate: [AuthGuardService] },
  { path: 'recover', component: EsqueciSenhaComponent },
  { path: 'index', loadChildren: './cliente/index/index.module#IndexModule'},
  { path: '', pathMatch: 'full', redirectTo: 'index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
