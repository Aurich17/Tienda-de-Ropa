import { NgModule } from "@angular/core";
import { MenusComponent } from "./aperturaparte/ventanas/menus/menus.component";
import { RolesComponent } from "./aperturaparte/ventanas/roles/roles.component";
import { RouterModule, Routes } from "@angular/router";
import { PageLoginComponent } from "./core/presentacion/page-login/page-login.component";
import { PageDashboardComponent } from "./dashboard/presentacion/page-dashboard/page-dashboard.component";

const routes: Routes = [
{path: '', component: PageLoginComponent },
{
path: 'dashboard',
loadChildren: () => 
import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
},
{

    path: "gestionpartes",
    loadChildren: () => import("./gestionpartes/gestionpartes.module").then(m => m.GestionpartesModule)

}, // lo que hace es cargar los archivo de ese modulo




{

    path: "aperturapartes",
    loadChildren: () => import("./aperturaparte/aperturaparte.module").then(m => m.AperturaparteModule)

},
{ path: "roles", component: RolesComponent,},
{ path: "menus", component: MenusComponent,},
/*
{

    path: "vizualizarparte",
    loadChildren: () => import("./vizualizarparte/vizualizarparte.module").then(m => m.VizualizarparteModule)

},


{

    path: "modificarparte",
    loadChildren: () => import("./modificarparte/modificarparte.module").then(m => m.ModificarparteModule)

},


{

    path: "tiempomuerto",
    loadChildren: () => import("./tiempomuerto/tiempomuerto.module").then(m => m.TiempomuertoModule)

},

{

    path: "cerrartiempomuerto",
    loadChildren: () => import("./cerrartiempomuerto/cerrartiempomuerto.module").then(m => m.CerrartiempomuertoModule)

},

{

    path: "importarprograma",
    loadChildren: () => import("./importarprogramacion/importarprogramacion.module").then(m => m.ImportarprogramacionModule)

},


{

    path: "informeparte",
    loadChildren: () => import("./informeparte/informeparte.module").then(m => m.InformeparteModule)

},


{

    path: "tiempopreparacion",
    loadChildren: () => import("./tiempopreparacion/tiempopreparacion.module").then(m => m.TiempopreparacionModule)

},

{

    path: "cerrartiempopreparacion",
    loadChildren: () => import("./cerrartiempopreparacion/cerrartiempopreparacion.module").then(m => m.CerrartiempopreparacionModule)

},

{

    path: "informetrazabilidad",
    loadChildren: () => import("./informetrazabilidad/informetrazabilidad.module").then(m => m.InformetrazabilidadModule)

},*/

];



@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule{



}