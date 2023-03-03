import { ManteMenuComponent } from './presentacion/components/mante-menu/mante-menu.component';
import { ManteMenuRoutingModule } from './mante-menu-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageManteMenuComponent } from './presentacion/page-mante-menu/page-mante-menu.component';
import { RegMenuComponent } from './presentacion/components/reg-menu/reg-menu.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { EditaMenuComponent } from './presentacion/components/edita-menu/edita-menu.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [ManteMenuComponent, PageManteMenuComponent, RegMenuComponent, EditaMenuComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ManteMenuRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule
  ],
  exports: [ManteMenuComponent],
  providers:[DatePipe]
})
export class ManteMenuModule { }
