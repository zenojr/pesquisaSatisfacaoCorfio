import { AuthService } from './login/auth.service';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { PesquisaService } from './pesquisa/pesquisa.service';
import { PesquisaReactiveFormComponent } from './pesquisa-reactive-form/pesquisa-reactive-form.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RelatoriosComponent } from './gerencial/relatorios/relatorios.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    PesquisaComponent,
    HeaderComponent,
    SidenavListComponent,
    PesquisaReactiveFormComponent,
    RelatoriosComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), // para pwa gravar offline e sincronizar quando a rede voltar
    AngularFireStorageModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    Ng2GoogleChartsModule,
    ChartsModule
  ],
  providers: [ AuthService, PesquisaService, { provide: FirestoreSettingsToken, useValue: {} } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
