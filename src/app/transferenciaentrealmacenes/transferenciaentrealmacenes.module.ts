import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferenciaentrealmacenesRoutingModule } from './transferenciaentrealmacenes-routing.module';

import { TransferenciaentrealmacenesComponent } from './presentacion/components/transferenciaentrealmacenes/transferenciaentrealmacenes.component';
import { PageTransferenciaentrealmacenesComponent } from './presentacion/page-transferenciaentrealmacenes/page-transferenciaentrealmacenes.component';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [PageTransferenciaentrealmacenesComponent, TransferenciaentrealmacenesComponent],
  imports: [
    CommonModule,
    TransferenciaentrealmacenesRoutingModule,
    SharedModule,
    MatGridListModule 
  ]
})
export class TransferenciaentrealmacenesModule { }
