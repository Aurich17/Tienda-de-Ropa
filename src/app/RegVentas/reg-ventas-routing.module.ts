import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegVentasComponent } from './presentacion/components/reg-ventas/reg-ventas.component';
const routes: Routes = [

  {path:'', component: RegVentasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegVentasRoutingModule { }