import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { KardexRoutingModule } from './kardex.routing.module';
import { ListadoKardexComponent } from './presentacion/components/listado-kardex/listado-kardex.component';

//@ts-ignore
@NgModule({
  declarations: [ ListadoKardexComponent],
  imports: [
    CommonModule,
    SharedModule,
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
