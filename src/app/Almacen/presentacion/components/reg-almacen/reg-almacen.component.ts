import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  almacen: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {almacen: 'Almacen A1'},
    {almacen: 'Almacen A2'},
    {almacen: 'Almacen A1'},
    {almacen: 'Almacen A1'},
    ];

@Component({
  selector: 'app-reg-almacen',
  templateUrl: './reg-almacen.component.html',
  styleUrls: ['./reg-almacen.component.css']
})
export class RegAlmacenComponent implements OnInit {
  subMenu = 'subMenu'

  constructor(public dialogRef: MatDialogRef<RegAlmacenComponent>) { }
  
  displayedColumns: string[] = ['almacen', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
