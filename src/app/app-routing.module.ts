import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarPerfilComponent } from './modules/public/cliente/editar-perfil/editar-perfil.component';
import { PerfilClienteComponent } from './modules/public/cliente/perfil-cliente/perfil-cliente.component';
import { SucessoComponent } from './modules/public/cliente/sucesso/sucesso.component';
import { EsqueciSenhaComponent } from './modules/public/esqueci-senha/esqueci-senha.component';
import { AuthGuardService } from './modules/public/login/auth/auth-guard.service';
import { LoginComponent } from './modules/public/login/login.component';
import { RegistroComponent } from './modules/public/registro/registro.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  //{ path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuardService] },
  { path: 'sucesso', component: SucessoComponent },
  { path: 'perfil', component: PerfilClienteComponent, canActivate: [AuthGuardService] },
  { path: 'perfil/editar/:id', component: EditarPerfilComponent, canActivate: [AuthGuardService] },
  { path: 'recover', component: EsqueciSenhaComponent },
  { path: 'index', loadChildren: () => import('./modules/public/cliente/index/index.module').then(m => m.IndexModule)},
  { path: '', pathMatch: 'full', redirectTo: 'index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
