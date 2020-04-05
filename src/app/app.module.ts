import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ListaAgendamentoComponent } from './lista-agendamento/lista-agendamento.component';
import { NavComponent } from './nav/nav.component';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GoogleChartsModule } from 'angular-google-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { CadastroServicoComponent } from './cadastro-servico/cadastro-servico.component';
defineLocale('pt-br', ptBrLocale);
import { AuthModule } from './auth/auth.module';

//export let options: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [
    AppComponent,
    AgendamentoComponent,
    ListaAgendamentoComponent,
    NavComponent,
    CadastroServicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    GoogleChartsModule.forRoot(),
    AlertModule.forRoot(),
    NgxMaskModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('pt-br');
    }
 }
