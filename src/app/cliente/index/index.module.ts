import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgxBootstrapModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class IndexModule {}
