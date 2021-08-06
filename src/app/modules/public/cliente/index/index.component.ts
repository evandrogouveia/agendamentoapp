import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs';
import { Cadastroservico } from 'src/app/shared/models/cadastroservico.model';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
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
  
  isDropdown = false;

  disableFloating = false;

  defaultImage = 'assets/img/placeholder.jpg';


  constructor(
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.servicos$ = this.apiService.getServicos();
  }

  getMessage(message: boolean) {
    this.isDropdown= message;
  }

  closeOverlay(): void {
    this.isDropdown = false; 
  }
}
