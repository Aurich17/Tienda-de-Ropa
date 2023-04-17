import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoKardexComponent } from './presentacion/components/listado-kardex/listado-kardex.component';
const routes: Routes = [
  {path:'', component: ListadoKardexComponent},
];

//@ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KardexRoutingModule { }
