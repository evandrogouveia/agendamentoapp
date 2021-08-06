import { Component, OnInit, ViewChild, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { Cadastroservico } from 'src/app/shared/models/cadastroservico.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { Usuario } from 'src/app/shared/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../login/auth/auth.service';



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

  results = false;

  loading = false;

  parametro;

  isDropdown = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private sidebarService: SidebarService,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
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

  getMessage(message: boolean) {
    this.isDropdown= message;
  }

  getValueMessage(message: string) {// recebe valor do input da busca através do EventEmitter
   if(message){
    this.servicos$ = this.apiService.searchByName(
      message.charAt(0).toUpperCase() + message.substr(1).toLowerCase()
    );
    this.closeOverlay();
   }
  }

  closeOverlay(): void {
    this.isDropdown = false;
  }
}
