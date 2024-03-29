import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

import { IndexRoutingModule } from './index-routing.module';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndexComponent } from './index.component';
import { ServicoDetalheComponent } from './servico-detalhe/servico-detalhe.component';
import { FooterComponent } from '../../footer/footer.component';
import { ResultadoBuscaComponent } from './resultado-busca/resultado-busca.component';
import { HeaderModule } from '../../header/header.module';


@NgModule({
  declarations: [
    IndexComponent,
    ServicoDetalheComponent,
    FooterComponent,
    ResultadoBuscaComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NgxBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImagesModule,
    HeaderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class IndexModule {}
