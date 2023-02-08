import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import { ImgSrcDirective } from '@angular/flex-layout';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DataSource} from '@angular/cdk/table';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table'; 

export interface MantenimientoRoles {
  usuario: string;
  codUsuario: number;
  rol: string;
  menu: string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codUsuario: 2, usuario: 'Usuario1', rol:'rol1', menu: 'Menu A1', estado: 'activo',},
    {codUsuario: 3, usuario: 'Usuario2', rol:'rol1', menu: 'Menu A2', estado: 'activo',},
    {codUsuario: 4, usuario: 'Usuario3', rol:'rol1', menu: 'Menu A1', estado: 'activo',},
    {codUsuario: 5, usuario: 'Usuario4', rol:'rol1', menu: 'Menu A1', estado: 'activo',},
    ];

  interface Roles {
    value: string;
    viewValue: string;
  }
  interface Menus {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-roles',
  templateUrl:'./roles.component.html',
  styleUrls:['./roles.component.css'],
})

export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['codUsuario', 'usuario', 'rol', 'menu', 'estado', 'opciones'];
  dataSource = ELEMENT_DATA;
  //Roles
  Roles: Roles[] = [
    {value: 'rol1', viewValue: 'Rol1'},
    {value: 'rol2', viewValue: 'Rol2'},
    {value: 'rol3', viewValue: 'Rol3'},
  ];
  //Menus
  Menus: Menus[] = [
    {value: 'menu1', viewValue: 'MenuA1'},
    {value: 'menu2', viewValue: 'MenuA2'},
    {value: 'menu3', viewValue: 'MenuA3'},
  ];
  
  
  ngOnInit() {
  }
  constructor() { }
}
