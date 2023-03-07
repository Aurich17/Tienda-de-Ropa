import { MantePersonalComponent } from './presentacion/components/mante-personal/mante-personal.component';
import { MantePersonalRoutingModule } from './mante-personal-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageMantePersonalComponent } from './presentacion/page-mante-personal/page-mante-personal.component';
import { RegPersonalComponent } from './presentacion/components/reg-personal/reg-personal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EditaPersonalComponent } from './presentacion/components/edita-personal/edita-personal.component';

@NgModule({
  declarations: [MantePersonalComponent, PageMantePersonalComponent, RegPersonalComponent, EditaPersonalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    MantePersonalRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule
  ],
  exports: [MantePersonalComponent],
  providers:[DatePipe]
})
export class MantePersonalModule { }
