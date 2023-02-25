import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioRolComponent } from './presentacion/components/usuario-rol/usuario-rol.component';
const routes: Routes = [

  {path:'', component: UsuarioRolComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRolRoutingModule { }