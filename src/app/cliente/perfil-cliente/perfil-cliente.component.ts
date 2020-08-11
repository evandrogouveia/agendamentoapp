import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { AuthService } from 'src/app/login/auth/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';
import { Agendamento } from 'src/app/shared/models/agendamento.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {
  usuario$: Observable<Usuario>;
  emailUser: any = [];
  agendamento$: Observable<Agendamento[]>;
  expanded;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private sidebarService: SidebarService
  ) {
    this.usuario$ = this.authService.getUser();
    this.afAuth.user.subscribe(data => { this.emailUser.push(data.email) })
  }

  ngOnInit() {
    setTimeout(() => {
      this.agendamento$ = this.apiService.getAgendamentosUser(this.emailUser.toString());//passar e-mail como parâmetro para o service
    }, 1100);

    this.sidebarService.obterToggle().subscribe(data => {
      this.expanded = data;
    });

  }

  executarViaService() {
    this.sidebarService.toggleNavbar(); // executa o método via service
  }

}
