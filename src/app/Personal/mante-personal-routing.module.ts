import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MantePersonalComponent } from './presentacion/components/mante-personal/mante-personal.component';
const routes: Routes = [

  {path:'', component: MantePersonalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantePersonalRoutingModule { }