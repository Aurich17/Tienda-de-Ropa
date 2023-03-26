import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteLotesComponent } from './presentacion/page-mante-lotes/page-mante-lotes.component';
import { RegLotesComponent } from './presentacion/components/reg-lotes/reg-lotes.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { EditaLotesComponent } from './presentacion/components/edita-lotes/edita-lotes.component';
import { ManteLotesComponent } from './presentacion/components/mante-lotes/mante-lotes.component';


@NgModule({
  declarations: [ManteLotesComponent, PageManteLotesComponent, RegLotesComponent, EditaLotesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatRadioModule,
    
    ReactiveFormsModule 
  ]
})
export class ManteLotesModule { }
