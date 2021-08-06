import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';
import { Agendamento } from 'src/app/shared/models/agendamento.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../login/auth/auth.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  @ViewChild('childModalProfile') childModalProfile: ModalDirective;
  @ViewChild('childModalNotifications') childModalNotifications: ModalDirective;

  usuario$: Observable<Usuario>;
  emailUser: any = [];
  agendamento$: Observable<Agendamento[]>;
  imageSrc = 'assets/img/icons/user-empty.svg';
  retract;

  dataAtual = new Date();

  mes = this.dataAtual.toLocaleDateString().substring(3, 5);

  totalAgendamentoMes: number;
  abertos;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private sidebarService: SidebarService,
    private router: Router,
  ) {
    this.usuario$ = this.authService.getUser();
    this.afAuth.user.subscribe(data => { 
      if(data){
        this.emailUser.push(data.email) 
      }
      
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.agendamento$ = this.apiService.getAgendamentosUser(this.emailUser.toString());//passar e-mail como parâmetro para o service
      this.totalMes();
    }, 1100);

    this.sidebarService.obterToggle().subscribe(data => {
      this.retract = data;
    });
  }

  openModalProfile(): void {
    this.childModalProfile.show();
  }

  closeModalProfile(): void {
    this.childModalProfile.hide();
  }

  openModalNotifications(): void {
    this.childModalNotifications.show();
  }

  closeModalNotifications(): void {
    this.childModalNotifications.hide();
  }

  executarViaService() {
    this.sidebarService.toggleNavbar(); // executa o método via service
  }

  totalMes() {
    this.agendamento$.pipe(
      map(values => {
        const b: any = values.map(d => d.data.substring(3, 5)).filter(dat => dat === this.mes);
        this.totalAgendamentoMes = b.length;
      })
    ).subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/index');
  }

}
