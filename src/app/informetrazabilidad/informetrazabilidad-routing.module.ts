import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageInformetrazabilidadComponent } from './presentacion/page-informetrazabilidad/page-informetrazabilidad.component';

const routes: Routes = [

  {path:'', component : PageInformetrazabilidadComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformetrazabilidadRoutingModule { }
