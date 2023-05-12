import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ListadoVentasRoutingModule } from './listado-ventas-routing.module';
import { ListadoVentasComponent } from './presentacion/components/listado-ventas/listado-ventas.component';
import { PageListadoVentasComponent } from './presentacion/page-listado-ventas/page-listado-ventas.component';


//@ts-ignore
@NgModule({
  declarations: [PageListadoVentasComponent, ListadoVentasComponent],
  imports: [
    CommonModule,
    SharedModule,
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
