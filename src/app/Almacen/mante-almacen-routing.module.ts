import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManteAlmacenComponent } from './presentacion/components/mante-almacen/mante-almacen.component';
const routes: Routes = [

  {path:'', component: ManteAlmacenComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteAlmacenRoutingModule { }