import { ListadoKardexService } from './services/kardex.service';
//@ts-ignore
import { ClienteService } from './services/cliente.service';

import { PromocionService } from './services/promocion.service';
import { PromocionRepository } from '../../src/app/Promociones/domain/promociones.repository';
import { TiendaService } from './services/tienda.service';
import { MenuRepository } from '../../src/app/menus/domain/menu.repository';
import { RolRepository} from '../../src/app/roles/domain/rol.repository';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserRepository } from './usuario/domain/user-repository';
import { UserOperations } from './usuario/infraestructura/user-operation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF, DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { AperturaparteRepository } from './aperturaparte/domain/parte.repository';
import { AperturaparteService } from './services/aperturaparte.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {MatInputModule} from '@angular/material/input';

import { InformeTrazabilidadRepository } from './informetrazabilidad/domain/informetrazabilidad.repository';
import { RolService } from './services/rol.service';
import { ManMenuService } from './services/manMenu.service';
import { AlmacenService } from './services/almacen.service';
import { AlmacenRepository } from './almacen/domain/almacen.repository';
import { PersonalRepository } from './personal/domain/personal.repository';
import { PersonalService } from './services/personal.service';
import { LoteRepository } from './lotes/domain/lote.repository';
import { LoteService } from './services/lote.service';
import { TiendaRepository } from './Tienda/domain/tienda.repository';
import { MedidaRepository } from './medida/domain/medida.repository';
import { MedidaService } from './services/medida.service';
import { ProductoRepository } from './producto/domain/producto.repository';
import { ProductoService } from './services/producto.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ListadoVentasService } from './services/listVentas.service';
import { ListadoVentasRepository } from './listadoVentas/domain/listadoVentas.respository';
import { ListadoKardexRepository } from './kardex/domain/kardex.repository';


import { IngresoProductoRepository } from './IngresoProducto/domain/ingresorproducto.repository';
import { IngresoProductoService } from './services/ingresoproducto';
import { TransferenciaEntreAlmacenesRepository } from './transferenciaentrealmacenes/domain/transferenciaentrealmacenes.repository';
import { TransferenciaEntreAlmacenesService } from './services/transferenciaentrealmacenes.service';
import { PageDashboardventaComponent } from './dashboardventa/presentacion/components/page-dashboardventa/page-dashboardventa.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ClienteRepository } from './regventas/domain/cliente.repository';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { GraficoRepository } from './Graficos/domain/graficos.repository';
import { GraficoService } from './services/graficos.service';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardprincipalComponent } from './dashboardprincipal/dashboardprincipal.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';





//import { AccordionComponent } from './core/presentacion/component/accordion/accordion/accordion.component';
//import { AccordionComponent } from './core/presentacion/component/accordion/accordion/accordion.component';

//@ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    PageDashboardventaComponent,


    NavigationComponent,
    DashboardprincipalComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgChartsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
  providers: [
  DatePipe,
  {provide: UserRepository, useClass: UserOperations},{provide: APP_BASE_HREF, useValue: '/'},
  {provide: AperturaparteRepository , useClass:AperturaparteService },
  {provide: RolRepository, useClass:RolService},
  {provide: MenuRepository, useClass:ManMenuService},
  {provide: AlmacenRepository, useClass:AlmacenService},
  {provide: PersonalRepository, useClass: PersonalService},
  {provide: LoteRepository, useClass: LoteService},
  {provide: TiendaRepository, useClass: TiendaService},
  {provide: PromocionRepository, useClass: PromocionService},
  {provide: MedidaRepository, useClass: MedidaService},
  {provide: ProductoRepository, useClass: ProductoService},
  
  {provide: ListadoVentasRepository, useClass: ListadoVentasService},
  {provide: ListadoKardexRepository, useClass: ListadoKardexService},
  {provide: IngresoProductoRepository, useClass: IngresoProductoService},
  {provide: ClienteRepository, useClass: ClienteService},
  {provide: TransferenciaEntreAlmacenesRepository, useClass: TransferenciaEntreAlmacenesService},
  {provide: ClienteRepository, useClass: ClienteService},
  {provide: GraficoRepository, useClass: GraficoService},
  { provide: NgChartsConfiguration, useValue: { generateColors: false }},


  // todo lo que se necesita que se instacie una vez se tieen que poner aca en el provider
  // todo lo que se necesita que se instacie una vez se tieen que poner aca en el provider


  {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true} ,//BarcodeScanner
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
