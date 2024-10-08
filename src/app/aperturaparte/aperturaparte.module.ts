import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AperturaparteRoutingModule } from './aperturaparte-routing.module';
import { PageAperturaparteComponent } from './presentacion/page-aperturaparte/page-aperturaparte.component';
import { AperturaparteComponent } from './presentacion/components/aperturaparte/aperturaparte.component';
import { SharedModule } from '../shared/shared.module';

import { FormAperturaparteComponent } from './presentacion/components/form-aperturaparte/form-aperturaparte.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageAperturaparteComponent, AperturaparteComponent,FormAperturaparteComponent],
  imports: [
    CommonModule,
    AperturaparteRoutingModule,
    SharedModule,
 
    ReactiveFormsModule
    
    
  ],
  exports: [AperturaparteComponent],
  providers:[DatePipe]
})
export class AperturaparteModule { }
