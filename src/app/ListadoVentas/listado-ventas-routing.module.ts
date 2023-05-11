import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoVentasComponent } from './presentacion/components/listado-ventas/listado-ventas.component';
import { RegVentasComponent } from '../RegVentas/presentacion/components/reg-ventas/reg-ventas.component';
const routes: Routes = [
  { path: 'Registro', component: RegVentasComponent, data: {table:true} },
  {path:'', component: ListadoVentasComponent},
];


//@ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoVentasRoutingModule { }
