import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionpartesRoutingModule } from './gestionpartes-routing.module';
import { PageGestionpartesComponent } from './presentacion/page-gestionpartes/page-gestionpartes.component';
import { GestionpartesComponent } from './presentacion/componets/gestionpartes/gestionpartes.component';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { share } from 'rxjs/operators';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PageGestionpartesComponent, GestionpartesComponent],
  imports: [
    CommonModule,
    GestionpartesRoutingModule,
    FlexLayoutModule,MatCardModule,
    SharedModule
  ],
  exports: []
})
export class GestionpartesModule { }
