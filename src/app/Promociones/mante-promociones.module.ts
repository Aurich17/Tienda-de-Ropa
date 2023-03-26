import { MantePromocionesComponent } from './presentacion/components/mante-promociones/mante-promociones.component';
import { MantePromocionesRoutingModule } from './mante-promociones-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageMantePromocionesComponent } from './presentacion/page-mante-promociones/page-mante-promociones.component';
import { RegPromocionesComponent } from './presentacion/components/reg-promociones/reg-promociones.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { EditaPromocionesComponent } from './presentacion/components/edita-promociones/edita-promociones.component';

@NgModule({
  declarations: [MantePromocionesComponent, PageMantePromocionesComponent, RegPromocionesComponent, EditaPromocionesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    MantePromocionesRoutingModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [MantePromocionesComponent],
  providers:[DatePipe]
})
export class MantePromocionesModule { }