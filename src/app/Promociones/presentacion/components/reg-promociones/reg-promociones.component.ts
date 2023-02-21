import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  personal: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {personal: 'Promocion 1'},
    {personal: 'Promocion 2'},
    {personal: 'Promocion 1'},
    {personal: 'Promocion 1'},
    ];

@Component({
  selector: 'app-reg-promociones',
  templateUrl: './reg-promociones.component.html',
  styleUrls: ['./reg-promociones.component.css']
})
export class RegPromocionesComponent implements OnInit {
  area = 'area'
  startDate = new Date(2023, 0, 1);
  personal = 'personal'

  constructor(public dialogRef: MatDialogRef<RegPromocionesComponent>) { }
  
  displayedColumns: string[] = ['personal', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
}