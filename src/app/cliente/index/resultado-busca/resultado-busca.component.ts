import { Component, OnInit, ViewChild, Renderer2, ElementRef, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { Cadastroservico } from 'src/app/shared/models/cadastroservico.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { Usuario } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/login/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resultado-busca',
  templateUrl: './resultado-busca.component.html',
  styleUrls: ['./resultado-busca.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(200)),
    ]),
  ]
})
export class ResultadoBuscaComponent implements OnInit {
  servicos$: Observable<Cadastroservico[]>;
  filtroServicos$: Observable<Cadastroservico[]>;
  usuario$: Observable<Usuario>;

  parametro;

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
    private route: ActivatedRoute,
  ) {
    this.usuario$ = this.authService.getUser();
  }

  ngOnInit() {
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scrollPosition = window.scrollY;
    });
    this.route.queryParams.subscribe(params => {
      this.parametro = params;
    });

    this.servicos$ = this.apiService.searchByName(
      this.parametro[0].charAt(0).toUpperCase() + this.parametro[0].substr(1).toLowerCase()
    );
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
      this.router.navigate(['index/result-search'], { queryParams: [event.target.value] });

      this.servicos$ = this.apiService.searchByName(
        event.target.value.charAt(0).toUpperCase() + event.target.value.substr(1).toLowerCase()
      );
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
