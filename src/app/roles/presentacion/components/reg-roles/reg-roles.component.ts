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
  selector: 'app-reg-roles',
  templateUrl: './reg-roles.component.html',
  styleUrls: ['./reg-roles.component.css']
})
export class RegRolesComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RegRolesComponent>) { }
  
  displayedColumns: string[] = ['menu','rol','opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
