import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  almacen: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {almacen: 'Lote A1'},
    {almacen: 'Lote A2'},
    {almacen: 'Lote A1'},
    {almacen: 'Lote A1'},
    ];

@Component({
  selector: 'app-reg-lotes',
  templateUrl: './reg-lotes.component.html',
  styleUrls: ['./reg-lotes.component.css']
})
export class RegLotesComponent implements OnInit {
  subMenu = 'subMenu'

  constructor(public dialogRef: MatDialogRef<RegLotesComponent>) { }
  
  displayedColumns: string[] = ['almacen', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
