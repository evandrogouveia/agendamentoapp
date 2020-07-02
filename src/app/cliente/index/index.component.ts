import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { Cadastroservico } from 'src/app/shared/models/cadastroservico.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { Usuario } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/login/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(200)),
    ]),
  ]
})

export class IndexComponent implements OnInit {
  servicos$: Observable<Cadastroservico[]>;
  filtroServicos$: Observable<Cadastroservico[]>;
  usuario$: Observable<Usuario>;

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('busca') busca: ElementRef;

  isDropdown = false;

  scrollPosition;


  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private sidebarService: SidebarService,
    private renderer: Renderer2,
    private router: Router,
  ) {
    this.usuario$ = this.authService.getUser();
  }

  ngOnInit() {
    this.servicos$ = this.apiService.getServicos();
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scrollPosition = window.scrollY;
    });
  }

  executarViaService() {
    this.sidebarService.toggleNavbar(); // executa o método via service
  }

  openModal(): void {
    this.childModal.show();
    setTimeout(() => {
      this.busca.nativeElement.focus();
    }, 500);
  }

  onOpenChange(data: boolean): void {
    this.isDropdown = data;
  }

  closeOverlay(): void {
    this.isDropdown = false;
    this.busca.nativeElement.blur();
  }

  searchServicos(event) {
    if (event) {
      this.router.navigate(['index/result-search'], {queryParams: [event.target.value]});
    }
    this.childModal.hide();
    this.closeOverlay();
    this.busca.nativeElement.value = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/index');
  }

}
