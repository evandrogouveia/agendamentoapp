import { Component } from '@angular/core';
import { SidebarService } from './shared/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  classe = '';

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.obterToggle()
      .subscribe(valor => {//setar o valor vindo do service na variável classe.
        this.classe = valor;
      });
  }
}
