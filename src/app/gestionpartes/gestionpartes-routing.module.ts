import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGestionpartesComponent } from './presentacion/page-gestionpartes/page-gestionpartes.component';

const routes: Routes = [

{path:'', component: PageGestionpartesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionpartesRoutingModule { }
