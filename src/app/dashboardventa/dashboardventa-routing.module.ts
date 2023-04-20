import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageDashboardventaComponent } from './presentacion/components/page-dashboardventa/page-dashboardventa.component';

const routes: Routes = [

  {path:'', component: PageDashboardventaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardventaRoutingModule { }
