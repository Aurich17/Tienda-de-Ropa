import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  menu: string;
  rol: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {menu: 'Menu A1', rol: 'Rol1'},
    {menu: 'Menu A2', rol: 'Rol2'},
    {menu: 'Menu A1', rol: 'Rol3'},
    {menu: 'Menu A1', rol: 'Rol4'},
    ];
@Component({
  selector: 'app-reg-usuario-rol',
  templateUrl: './reg-usuario-rol.component.html',
  styleUrls: ['./reg-usuario-rol.component.css']
})
export class RegUsuarioRolComponent implements OnInit {

  usuario ='usuario'
  rol = 'rol'
  menu = 'menu'
  constructor(public dialogRef: MatDialogRef<RegUsuarioRolComponent>) { }
  
  displayedColumns: string[] = ['menu','rol','opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
