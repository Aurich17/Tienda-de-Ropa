import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './presentacion/page-login/page-login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './presentacion/components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './presentacion/components/header/header.component';
import { MenuComponent } from './presentacion/component/menu/menu.component';
import { AccordionComponent } from './presentacion/component/accordion/accordion/accordion.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [PageLoginComponent, LoginComponent, HeaderComponent, MenuComponent,AccordionComponent],
  imports: [
    CommonModule,SharedModule,FormsModule,ReactiveFormsModule,RouterModule
  ],
  exports:[PageLoginComponent,HeaderComponent],//para que sea visible en todo los modulos
})
export class CoreModule { }
