import { ManteAlmacenComponent } from './presentacion/components/mante-almacen/mante-almacen.component';
import { ManteAlmacenRoutingModule } from './mante-almacen-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteAlmacenComponent } from './presentacion/page-mante-almacen/page-mante-almacen.component';
import { RegAlmacenComponent } from './presentacion/components/reg-almacen/reg-almacen.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [ManteAlmacenComponent, PageManteAlmacenComponent, RegAlmacenComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ManteAlmacenRoutingModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [ManteAlmacenComponent],
  providers:[DatePipe]
})
export class ManteAlmacenModule { }