import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { ServicoDetalheComponent } from './servico-detalhe/servico-detalhe.component';
import { ResultadoBuscaComponent } from './resultado-busca/resultado-busca.component';

const routes: Routes = [
  { path: 'result-search', component: ResultadoBuscaComponent },
  { path: '', component: IndexComponent },
  { path: ':id', component: ServicoDetalheComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
