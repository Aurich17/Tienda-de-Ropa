import { ManteProductoComponent } from './presentacion/components/mante-producto/mante-producto.component';
import { ManteProductoRoutingModule } from './mante-producto-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteProductoComponent } from './presentacion/page-mante-producto/page-mante-producto.component';
import { RegProductoComponent } from './presentacion/components/reg-producto/reg-producto.component';
import {MatRadioModule} from '@angular/material/radio';
import { EditaProductoComponent } from './presentacion/components/edita-producto/edita-producto.component';

@NgModule({
  declarations: [ManteProductoComponent, PageManteProductoComponent, RegProductoComponent, EditaProductoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ManteProductoRoutingModule,
    MatRadioModule 
  ],
  exports: [ManteProductoComponent],
  providers:[DatePipe]
})
export class ManteProductoModule { }
