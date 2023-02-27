import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManteProductoComponent } from './presentacion/components/mante-producto/mante-producto.component';
const routes: Routes = [

  {path:'', component: ManteProductoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteProductoRoutingModule { }