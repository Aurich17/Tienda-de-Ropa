import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ManteMedidaComponent } from './presentacion/components/mante-medida/mante-medida.component';

const routes: Routes = [

  //{path:'', component: ManteMedidaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteMedidaRoutingModule { }