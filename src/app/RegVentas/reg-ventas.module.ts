
import { RegVentasRoutingModule } from './reg-ventas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageRegVentasComponent } from './presentacion/page-reg-ventas/page-reg-ventas.component';
import { RegVentasComponent } from './presentacion/components/reg-ventas/reg-ventas.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { BuscarClienteComponent } from './presentacion/components/buscar-cliente/buscar-cliente.component';
import { AgregarClienteComponent } from './presentacion/components/agregar-cliente/agregar-cliente.component';
import { BuscarProductoComponent } from './presentacion/components/buscar-producto/buscar-producto.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PageRegVentasComponent, RegVentasComponent, BuscarClienteComponent, AgregarClienteComponent, BuscarProductoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    RegVentasRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [RegVentasComponent],
  providers:[DatePipe]
})
export class RegVentasModule { }