import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  toggled = false ;
  class = '';

  private toggleBehaviorSubject = new BehaviorSubject<string>('');

  constructor() { }

  toggleNavbar() {// método que faz o menu recolher
    this.toggled = !this.toggled;
    if (this.toggled === true) {
      this.class = 'toggled';
    } else {
      this.class = '';
    }
    this.toggleBehaviorSubject.next(this.class);
  }

  obterToggle() { // obtém o valor de toggleBehaviorSubject
    return this.toggleBehaviorSubject;
  }
}
