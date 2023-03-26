import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageIngresoproductoComponent } from './presentacion/page-ingresoproducto/page-ingresoproducto.component';

const routes: Routes = [

  {path:'', component: PageIngresoproductoComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoProductoRoutingModule { }
