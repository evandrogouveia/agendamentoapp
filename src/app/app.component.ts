import { Component, OnInit } from '@angular/core';
import { SidebarService } from './shared/services/sidebar.service';
import { AuthService } from './login/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessagingService } from './shared/services/messaging.service';
import { Usuario } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sistema-agendamento';
  classe = '';
  authenticated$: Observable<boolean>;
  mostrarSidebarMenu = false;
  usuario$: Observable<Usuario>;
  perfilUsuario = null;
  message;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService,
    private router: Router,
    private msg: MessagingService
  ) {
    this.usuario$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticated();
  }

  ngOnInit(): void {
    this.sidebarService.obterToggle()
      .subscribe(valor => { // setar o valor vindo do service na variável classe.
        this.classe = valor;
      });

    /*this.usuario$.subscribe(data => {
      data ? this.perfilUsuario = data.perfil : this.perfilUsuario = null;

      if (this.perfilUsuario === 'admin') {
        this.router.navigateByUrl('admin/lista-agendamentos');
      } else {
        this.router.navigateByUrl('/agendamento');
      }
    });*/

    this.authenticated$.subscribe(a => {
      this.mostrarSidebarMenu = a;
    });

    this.msg.requestPermission();
    this.msg.receiveMessage();
    this.message = this.msg.currentMessage;

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/index');
  }
}
