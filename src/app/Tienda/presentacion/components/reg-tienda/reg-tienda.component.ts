import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  tienda: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {tienda: 'Almacen A1'},
    {tienda: 'Almacen A2'},
    {tienda: 'Almacen A1'},
    {tienda: 'Almacen A1'},
    ];

@Component({
  selector: 'app-reg-tienda',
  templateUrl: './reg-tienda.component.html',
  styleUrls: ['./reg-tienda.component.css']
})
export class RegTiendaComponent implements OnInit {
  subMenu = 'subMenu'

  constructor(public dialogRef: MatDialogRef<RegTiendaComponent>) { }
  
  displayedColumns: string[] = ['tienda', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
