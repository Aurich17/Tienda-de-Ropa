import { ManteRolesComponent } from './presentacion/components/mante-roles/mante-roles.component';
import { ManteRolesRoutingModule } from './mante-roles-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteRolesComponent } from './presentacion/page-mante-roles/page-mante-roles.component';

@NgModule({
  declarations: [ManteRolesComponent, PageManteRolesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ManteRolesRoutingModule 
  ],
  exports: [ManteRolesComponent],
  providers:[DatePipe]
})
export class ManteRolesModule { }
