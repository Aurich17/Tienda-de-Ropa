import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManteTiendaComponent } from './presentacion/components/mante-tienda/mante-tienda.component';
const routes: Routes = [

  {path:'', component: ManteTiendaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteTiendaRoutingModule { }