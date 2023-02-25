import { UsuarioRolComponent } from './presentacion/components/usuario-rol/usuario-rol.component';
import { RegUsuarioRolComponent } from './presentacion/components/reg-usuario-rol/reg-usuario-rol.component';
import { UsuarioRolRoutingModule } from './usuario-rol.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageUsuarioRolComponent } from './presentacion/page-usuario-rol/page-usuario-rol.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [UsuarioRolComponent, PageUsuarioRolComponent, RegUsuarioRolComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    UsuarioRolRoutingModule,
    MatRadioModule 
  ],
  exports: [UsuarioRolComponent],
  providers:[DatePipe]
})
export class UsuarioRolModule { }
