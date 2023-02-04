import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserRepository } from './usuario/domain/user-repository';
import { UserOperations } from './usuario/infraestructura/user-operation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { RouterModule } from '@angular/router';
import { AperturaparteRepository } from './aperturaparte/domain/parte.repository';
import { AperturaparteService } from './services/aperturaparte.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {MatInputModule} from '@angular/material/input';

import { InformeTrazabilidadRepository } from './informetrazabilidad/domain/informetrazabilidad.repository';





//import { AccordionComponent } from './core/presentacion/component/accordion/accordion/accordion.component';
//import { AccordionComponent } from './core/presentacion/component/accordion/accordion/accordion.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,    
  ],
  providers: [
  {provide: UserRepository, useClass: UserOperations},{provide: APP_BASE_HREF, useValue: '/'},
  {provide: AperturaparteRepository , useClass:AperturaparteService },
  // todo lo que se necesita que se instacie una vez se tieen que poner aca en el provider
  // todo lo que se necesita que se instacie una vez se tieen que poner aca en el provider
 

  {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true} ,//BarcodeScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
