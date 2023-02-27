import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManteLotesComponent } from './presentacion/components/mante-lotes/mante-lotes.component';
const routes: Routes = [

  {path:'', component: ManteLotesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteLotesRoutingModule { }