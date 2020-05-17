import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

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
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('busca') busca: any;
  isDropdown = false;

  constructor() { }

  ngOnInit() {

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
