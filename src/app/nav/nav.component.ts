import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../shared/sidebar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  executarViaService() {
    this.sidebarService.toggleNavbar(); //executa o método via service
  }

}
