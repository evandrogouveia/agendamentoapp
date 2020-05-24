import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Observable } from 'rxjs';
import { Cadastroservico } from 'src/app/shared/models/cadastroservico.model';
import { ApiService } from 'src/app/shared/services/api.service';

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

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('busca') busca: any;
  isDropdown = false;

  constructor(private apiService: ApiService, private sidebarService: SidebarService) { }

  ngOnInit() {
    this.servicos$ = this.apiService.getServicos();
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

}
