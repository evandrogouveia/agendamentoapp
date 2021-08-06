import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';

import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgxBootstrapModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule { }
