import { ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IMenu } from 'src/app/interfaces/menu.interface';
import { MenuService } from 'src/app/services/menu.service';
import { Config, Menu } from '../accordion/accordion/type';
import {MatListModule} from '@angular/material/list'
import { AuthService } from 'src/app/services/auth.service';
import { GroupMenu } from 'src/app/interfaces/tokens.interface';
import { ResponseLogin } from 'src/app/usuario/domain/user-entity';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  template: `
    <h1>Opciones Produccion</h1>
    <accordion 
      [options]="options" 
      [menus]="menus">
    </accordion>
  `
})
export class MenuComponent  {

  listMenu: IMenu[] = [];
  @Input() options;
  @Input() menus: GroupMenu[];
  config: Config;


  
  constructor(
    private readonly menu: MenuService,
    private readonly router: Router,
    private readonly auth: AuthService
    ) { }

    responselogin : ResponseLogin=  <ResponseLogin>{}
  


  ngOnInit(): void {
    this.config = this.mergeConfig(this.options);
    this.listMenu = this.menu.Menu;
   // this.menus = this.menu.menus;
   this.responselogin = this.auth.getListaMenu()
   if (this.menus===undefined){

    this.menus =  this.auth.getMenuF5().grupomenu;


   }else {

       this.menus =this.responselogin.datos.result.menu.grupomenu;
   }




  

    //console.log(this.auth.getListaMenu())
  }
  

    mergeConfig(options: Config) {
    // 기본 옵션
    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }

  toggle(index: number) {
    // 멀티 오픈을 허용하지 않으면 타깃 이외의 모든 submenu를 클로즈한다.

    
    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }

    // Menu의 active를 반전
    this.menus[index].active = !this.menus[index].active;
    
  }

  goto (path:string): void {


    if(path != '#' ){
      this.router.navigate([path])
    }

  }

  



}
