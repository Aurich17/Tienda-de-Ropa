import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageDashboardComponent } from './presentacion/page-dashboard/page-dashboard.component';

const routes: Routes = [
{path: '', component: PageDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
