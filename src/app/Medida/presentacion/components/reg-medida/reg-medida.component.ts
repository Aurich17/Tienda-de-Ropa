import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  medida: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {medida: 'Medida 1'},
    {medida: 'Medida 2'},
    {medida: 'Medida 1'},
    {medida: 'Medida 1'},
    ];

@Component({
  selector: 'app-reg-medida',
  templateUrl: './reg-medida.component.html',
  styleUrls: ['./reg-medida.component.css']
})
export class RegMedidaComponent implements OnInit {
  subMenu = 'subMenu'

  constructor(public dialogRef: MatDialogRef<RegMedidaComponent>) { }
  
  displayedColumns: string[] = ['medida', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
}