import { ManteTiendaComponent } from './presentacion/components/mante-tienda/mante-tienda.component';
import { ManteTiendaRoutingModule } from './mante-tienda-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PageManteTiendaComponent } from './presentacion/page-mante-tienda/page-mante-tienda.component';
import { RegTiendaComponent } from './presentacion/components/reg-tienda/reg-tienda.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { EditaTiendaComponent } from './presentacion/components/edita-tienda/edita-tienda.component';

@NgModule({
  declarations: [ManteTiendaComponent, PageManteTiendaComponent, RegTiendaComponent, EditaTiendaComponent],
  imports: [
    CommonModule,
    SharedModule,
  
    ReactiveFormsModule,
    ManteTiendaRoutingModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [ManteTiendaComponent],
  providers:[DatePipe]
})
export class ManteTiendaModule { }