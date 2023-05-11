

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgregarClienteComponent } from '../RegVentas/presentacion/components/agregar-cliente/agregar-cliente.component';
import { RegVentasComponent } from '../RegVentas/presentacion/components/reg-ventas/reg-ventas.component';
import { PageRegVentasComponent } from '../RegVentas/presentacion/page-reg-ventas/page-reg-ventas.component';
import { RegVentasRoutingModule } from '../RegVentas/reg-ventas-routing.module';
import { BuscarClienteComponent } from '../RegVentas/presentacion/components/buscar-cliente/buscar-cliente.component';
import { BuscarProductoComponent } from '../RegVentas/presentacion/components/buscar-producto/buscar-producto.component';



@NgModule({
  declarations: [PageRegVentasComponent, RegVentasComponent, BuscarClienteComponent, AgregarClienteComponent, BuscarProductoComponent],
  imports: [
    CommonModule,
    SharedModule,

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
