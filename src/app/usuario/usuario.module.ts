import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    HttpClientModule  //para llamar todo lo que sea externo a la aplicacion (api)
  ]
})
export class UsuarioModule { }
