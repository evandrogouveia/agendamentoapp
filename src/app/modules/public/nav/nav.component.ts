import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { AuthService } from '../login/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  usuario$: Observable<Usuario>;

  constructor(private authService: AuthService, private sidebarService: SidebarService) {
    this.usuario$ = this.authService.getUser();
   }

  ngOnInit() {
  }

  executarViaService() {
    this.sidebarService.toggleNavbar(); // executa o método via service
  }

}
