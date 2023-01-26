import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AperturaparteRoutingModule } from './aperturaparte-routing.module';
import { PageAperturaparteComponent } from './presentacion/page-aperturaparte/page-aperturaparte.component';
import { AperturaparteComponent } from './presentacion/components/aperturaparte/aperturaparte.component';
import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormAperturaparteComponent } from './presentacion/components/form-aperturaparte/form-aperturaparte.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageAperturaparteComponent, AperturaparteComponent,FormAperturaparteComponent ],
  imports: [
    CommonModule,
    AperturaparteRoutingModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule
    
    
  ],
  exports: [AperturaparteComponent],
  providers:[DatePipe]
})
export class AperturaparteModule { }
