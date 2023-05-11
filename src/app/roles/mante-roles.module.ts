import { ManteRolesComponent } from './presentacion/components/mante-roles/mante-roles.component';
import { RegRolesComponent } from './presentacion/components/reg-roles/reg-roles.component';
import { ManteRolesRoutingModule } from './mante-roles-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { PageManteRolesComponent } from './presentacion/page-mante-roles/page-mante-roles.component';
import {MatRadioModule} from '@angular/material/radio';
import { EditaRolesComponent } from './presentacion/components/edita-roles/edita-roles.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManteRolesComponent, PageManteRolesComponent, RegRolesComponent, EditaRolesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    ReactiveFormsModule,
    ManteRolesRoutingModule,
    MatRadioModule ,
    FormsModule,
  ],
  exports: [ManteRolesComponent],
  providers:[DatePipe]
})
export class ManteRolesModule { }
