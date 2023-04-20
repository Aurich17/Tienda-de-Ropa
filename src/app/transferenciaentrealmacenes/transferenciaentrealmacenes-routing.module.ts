import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTransferenciaentrealmacenesComponent } from './presentacion/page-transferenciaentrealmacenes/page-transferenciaentrealmacenes.component';

const routes: Routes = [

  {path:'', component: PageTransferenciaentrealmacenesComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class TransferenciaentrealmacenesRoutingModule { }
