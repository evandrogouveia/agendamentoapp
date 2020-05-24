import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { IndexComponent } from './index.component';
import { ServicoDetalheComponent } from './servico-detalhe/servico-detalhe.component';


@NgModule({
  declarations: [IndexComponent, ServicoDetalheComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgxBootstrapModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class IndexModule {}
