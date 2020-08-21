import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Cadastroservico } from '../shared/models/cadastroservico.model';
import { AuthService } from '../login/auth/auth.service';
import { ApiService } from '../shared/services/api.service';
import { SidebarService } from '../shared/services/sidebar.service';
import { Router } from '@angular/router';
import { Usuario } from '../shared/models/user';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(200)),
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  usuario$: Observable<Usuario>;

  @Output() isDropdownToEmit = new EventEmitter<boolean>();

  isDropdown = false;

  scrollPosition;
 

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('busca') busca: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { 
    this.usuario$ = this.authService.getUser();
  }

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
    this.isDropdownToEmit.emit(data)
  }

  closeOverlay(): void {
    this.isDropdown = false;
    this.busca.nativeElement.blur();
  }

  searchServicos(event) {
    if (event && (this.busca.nativeElement.value !== '')) {
      this.router.navigate(['index/result-search'], { queryParams: [event.target.value] });
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
