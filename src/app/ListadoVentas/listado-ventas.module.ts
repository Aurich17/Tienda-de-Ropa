import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageListadoVentasComponent } from './presentacion/page-listado-ventas/page-listado-ventas.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { ListadoVentasComponent } from './presentacion/components/listado-ventas/listado-ventas.component';
import { ListadoVentasRoutingModule } from './listado-ventas-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';


//@ts-ignore
@NgModule({
  declarations: [PageListadoVentasComponent, ListadoVentasComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ListadoVentasRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule
  ],
  exports: [ListadoVentasComponent],
  providers:[DatePipe]
})
export class ListadoVentasModule { }
