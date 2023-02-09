import { ManteMenuComponent } from './presentacion/components/mante-menu/mante-menu.component';
import { ManteMenuRoutingModule } from './mante-menu-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteMenuComponent } from './presentacion/page-mante-menu/page-mante-menu.component';
import { RegMenuComponent } from './presentacion/components/reg-menu/reg-menu.component';

@NgModule({
  declarations: [ManteMenuComponent, PageManteMenuComponent, RegMenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ManteMenuRoutingModule 
  ],
  exports: [ManteMenuComponent],
  providers:[DatePipe]
})
export class ManteMenuModule { }
