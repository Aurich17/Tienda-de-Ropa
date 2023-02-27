import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManteMenuComponent } from './presentacion/components/mante-menu/mante-menu.component';
const routes: Routes = [

  {path:'', component: ManteMenuComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteMenuRoutingModule { }