import { RegVentasComponent } from './RegVentas/presentacion/components/reg-ventas/reg-ventas.component';
import { NgModule } from "@angular/core";
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
{
    path: "Menu",
    loadChildren: () => import("./menus/mante-menu.module").then(m => m.ManteMenuModule)
},
{
    path: "Roles",
    loadChildren: () => import("./roles/mante-roles.module").then(m => m.ManteRolesModule)
},
{
    path: "Producto",
    loadChildren: () => import("./producto/mante-producto.module").then(m => m.ManteProductoModule)
},
{
    path: "Personal",
    loadChildren: () => import("./personal/mante-personal.module").then(m => m.MantePersonalModule)
},
{
    path: "Almacen",
    loadChildren: () => import("./almacen/mante-almacen.module").then(m => m.ManteAlmacenModule)
},
{
    path: "Lotes",
    loadChildren: () => import("./lotes/mante-lotes.module").then(m => m.ManteLotesModule)
},
{
    path: "Tienda",
    loadChildren: () => import("./tienda/mante-tienda.module").then(m => m.ManteTiendaModule)
},
{
    path: "Promociones",
    loadChildren: () => import("./promociones/mante-promociones.module").then(m => m.MantePromocionesModule)
},
{
    path: "Medida",
    loadChildren: () => import("./medida/mante-medida.module").then(m => m.ManteMedidaModule)
},
{
    path: "Registro",
    loadChildren: () => import("./RegVentas/reg-ventas.module").then(m => m.RegVentasModule)
},
{ path: './RegVentas/reg-ventas.component/:datos', component: RegVentasComponent }
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