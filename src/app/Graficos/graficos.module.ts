
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { DashboardProductoComponent } from './presentacion/components/dashboard-producto/dashboard-producto.component';
import { GraficosRoutingModule } from './graficos-routing.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DashboardProductoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    GraficosRoutingModule,
    MatCheckboxModule,
    MatRadioModule,
    NgChartsModule
  ],
  exports: [DashboardProductoComponent],
  providers:[DatePipe]
})
export class GraficosModule { }
