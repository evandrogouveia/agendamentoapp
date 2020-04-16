import { Component } from '@angular/core';
import { SidebarService } from './shared/services/sidebar.service';
import { AuthService } from './shared/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  classe = '';
  authenticated$: Observable<boolean>;
  mostrarSidebarMenu = false;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService,
    private router: Router
    ) {

      this.authenticated$ = this.authService.authenticated();
    }

  ngOnInit() {
    this.sidebarService.obterToggle()
      .subscribe(valor => { // setar o valor vindo do service na variável classe.
        this.classe = valor;
    });

    this.authenticated$.subscribe(data => {
      this.mostrarSidebarMenu = data;
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
