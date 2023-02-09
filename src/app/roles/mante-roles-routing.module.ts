import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManteRolesComponent } from './presentacion/components/mante-roles/mante-roles.component';
const routes: Routes = [

  {path:'', component: ManteRolesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteRolesRoutingModule { }