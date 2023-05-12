import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardProductoComponent } from './presentacion/components/dashboard-producto/dashboard-producto.component';
const routes: Routes = [

  {path:'', component: DashboardProductoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficosRoutingModule { }
