import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { trigger, state, style, animate, transition } from '@angular/animations';



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


  isDropdown = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
   
  }

  onOpenChange(data: boolean): void {
    this.isDropdown = data;
  }

}
