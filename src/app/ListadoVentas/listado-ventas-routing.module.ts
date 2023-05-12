import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegVentasComponent } from '../regventas/presentacion/components/reg-ventas/reg-ventas.component';
import { ListadoVentasComponent } from './presentacion/components/listado-ventas/listado-ventas.component';
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
