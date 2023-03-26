import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoProductoRoutingModule } from './ingreso-producto-routing.module';
import { IngresoproductoComponent } from './presentacion/components/ingresoproducto.component';
import { PageIngresoproductoComponent } from './presentacion/page-ingresoproducto/page-ingresoproducto.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PageIngresoproductoComponent,IngresoproductoComponent],
  imports: [
    CommonModule,
    IngresoProductoRoutingModule,
    SharedModule


  ]
})
export class IngresoProductoModule { }
