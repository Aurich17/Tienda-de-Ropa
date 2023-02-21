import { ManteMedidaComponent } from './presentacion/components/mante-medida/mante-medida.component';
import { ManteMedidaRoutingModule } from './mante-medida-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteMedidaComponent } from './presentacion/page-mante-medida/page-mante-medida.component';
import { RegMedidaComponent } from './presentacion/components/reg-medida/reg-medida.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [ManteMedidaComponent, PageManteMedidaComponent, RegMedidaComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ManteMedidaRoutingModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [ManteMedidaComponent],
  providers:[DatePipe]
})
export class ManteMedidaModule { }