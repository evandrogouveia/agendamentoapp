import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AdminRoutingModule } from './admin.routing.module';
import { NavComponent } from '../nav/nav.component';



@NgModule({
  declarations: [CadastroServicoComponent, ListaAgendamentoComponent, NavComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [NavComponent]
})
export class AdminModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminModule,
      providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
      ]
    }
  }
}
