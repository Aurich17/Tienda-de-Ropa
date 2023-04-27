
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { ManteAlmacenComponent } from './presentacion/components/mante-almacen/mante-almacen.component';
import { PageManteAlmacenComponent } from './presentacion/page-mante-almacen/page-mante-almacen.component';
import { RegAlmacenComponent } from './presentacion/components/reg-almacen/reg-almacen.component';
import { ManteAlmacenRoutingModule } from './mante-almacen-routing.module';
import { EditaAlmacenComponent } from './presentacion/components/edita-almacen/edita-almacen.component';


@NgModule({
  declarations: [ManteAlmacenComponent, PageManteAlmacenComponent, RegAlmacenComponent, EditaAlmacenComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ManteAlmacenRoutingModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [ManteAlmacenComponent],
  providers:[DatePipe]
})
export class ManteAlmacenModule { }