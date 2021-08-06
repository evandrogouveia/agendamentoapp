import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData, AsyncPipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { environment } from 'src/environments/environment';
import { AdminModule } from './modules/private/admin/admin.module';
import { MessagingService } from './shared/services/messaging.service';


import { NgxBootstrapModule } from './ngx-bootstrap.module';
import { RegistroComponent } from './modules/public/registro/registro.component';
import { EsqueciSenhaComponent } from './modules/public/esqueci-senha/esqueci-senha.component';
import { SucessoComponent } from './modules/public/cliente/sucesso/sucesso.component';
import { PerfilClienteComponent } from './modules/public/cliente/perfil-cliente/perfil-cliente.component';
import { EditarPerfilComponent } from './modules/public/cliente/editar-perfil/editar-perfil.component';
import { AuthModule } from './modules/public/login/auth/auth.module';
import { HeaderModule } from './modules/public/header/header.module';



export let options: Partial<IConfig> | (() => Partial<IConfig>);

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    EsqueciSenhaComponent,
    SucessoComponent,
    PerfilClienteComponent,
    EditarPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    GoogleChartsModule.forRoot(),
    NgxMaskModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AuthModule,
    AdminModule.forRoot(),
    HttpClientModule,
    Ng2ImgMaxModule,
    LazyLoadImagesModule,
    HeaderModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DatePipe, MessagingService, AsyncPipe,  {
    provide: LOCALE_ID,
    useValue: 'pt'
}],

  bootstrap: [AppComponent]
})
export class AppModule {}
