import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InformetrazabilidadRoutingModule } from './informetrazabilidad-routing.module';
import { PageInformetrazabilidadComponent } from './presentacion/page-informetrazabilidad/page-informetrazabilidad.component';
import { InformetrazabilidadComponent } from './presentacion/components/informetrazabilidad/informetrazabilidad.component';
import { SharedModule } from '../shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [PageInformetrazabilidadComponent, InformetrazabilidadComponent],
  imports: [
    CommonModule,
    InformetrazabilidadRoutingModule,
    SharedModule
  ],
  providers:[ DatePipe,  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class InformetrazabilidadModule { }
