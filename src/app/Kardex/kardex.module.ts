import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { KardexRoutingModule } from './kardex.routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ListadoKardexComponent } from './presentacion/components/listado-kardex/listado-kardex.component';


//@ts-ignore
@NgModule({
  declarations: [ ListadoKardexComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    KardexRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule
  ],
  exports: [ListadoKardexComponent],
  providers:[DatePipe]
})
export class KardexModule { }
