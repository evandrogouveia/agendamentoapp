import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { AuthService } from 'src/app/login/auth/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/models/user';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {
  usuario$: Observable<Usuario>;
  expanded;
  
  constructor(private authService: AuthService, private sidebarService: SidebarService) { 
    this.usuario$ = this.authService.getUser();
  }

  ngOnInit() {
   this.sidebarService.obterToggle().subscribe(data => {
    this.expanded = data;
   });
  }

  executarViaService() {
    this.sidebarService.toggleNavbar(); // executa o método via service
  }

}
