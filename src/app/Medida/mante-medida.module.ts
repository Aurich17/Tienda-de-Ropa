
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
//import { ManteMedidaRoutingModule } from './mante-medida-routing.module';
//import { ManteMedidaComponent } from './presentacion/components/mante-medida/mante-medida.component';
//import { PageManteMedidaComponent } from './presentacion/page-mante-medida/page-mante-medida.component';
//import { RegMedidaComponent } from './presentacion/components/reg-medida/reg-medida.component';
//import { EditaMedidaComponent } from './presentacion/components/edita-medida/edita-medida.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,

    ReactiveFormsModule,
    
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [],
  providers:[DatePipe]
})
export class ManteMedidaModule { }