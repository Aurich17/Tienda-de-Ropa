import { ManteLotesComponent } from './presentacion/components/mante-lotes/mante-lotes.component';
import { ManteLotesRoutingModule } from './mante-lotes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteLotesComponent } from './presentacion/page-mante-lotes/page-mante-lotes.component';
import { RegLotesComponent } from './presentacion/components/reg-lotes/reg-lotes.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [ManteLotesComponent, PageManteLotesComponent, RegLotesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ManteLotesRoutingModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [ManteLotesComponent],
  providers:[DatePipe]
})
export class ManteLotesModule { }