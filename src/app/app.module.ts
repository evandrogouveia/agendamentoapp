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

import { AuthModule } from './login/auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MessagingService } from './shared/services/messaging.service';
import { RegistroComponent } from './registro/registro.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { SucessoComponent } from './cliente/sucesso/sucesso.component';
import { PerfilClienteComponent } from './cliente/perfil-cliente/perfil-cliente.component';

import { NgxBootstrapModule } from './ngx-bootstrap.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';



export let options: Partial<IConfig> | (() => Partial<IConfig>);

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    EsqueciSenhaComponent,
    SidebarComponent,
    SucessoComponent,
    PerfilClienteComponent,
    EditarPerfilComponent
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
    LazyLoadImagesModule 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DatePipe, MessagingService, AsyncPipe,  {
    provide: LOCALE_ID,
    useValue: 'pt'
}],

  bootstrap: [AppComponent]
})
export class AppModule {}
