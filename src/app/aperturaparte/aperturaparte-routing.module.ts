import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AperturaparteComponent } from './presentacion/components/aperturaparte/aperturaparte.component';
import { PageAperturaparteComponent } from './presentacion/page-aperturaparte/page-aperturaparte.component';

const routes: Routes = [

  {path:'', component: PageAperturaparteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AperturaparteRoutingModule { }
