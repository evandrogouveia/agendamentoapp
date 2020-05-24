import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    CollapseModule,
    BsDatepickerModule,
    TabsModule,
    AlertModule,
    defineLocale,
    ptBrLocale,
    ModalModule,
    BsDropdownModule,
    BsLocaleService
} from 'ngx-bootstrap';


defineLocale('pt-br', ptBrLocale);
@NgModule({
  imports: [
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    CollapseModule,
    BsDatepickerModule,
    TabsModule,
    AlertModule,
    ModalModule,
    BsDropdownModule,
  ],
  declarations: []
})
export class NgxBootstrapModule { 
    constructor(private bsLocaleService: BsLocaleService) {
        this.bsLocaleService.use('pt-br');
    }
}
