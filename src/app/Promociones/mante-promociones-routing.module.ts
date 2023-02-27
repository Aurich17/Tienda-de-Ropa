import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MantePromocionesComponent } from './presentacion/components/mante-promociones/mante-promociones.component';
const routes: Routes = [

  {path:'', component: MantePromocionesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantePromocionesRoutingModule { }