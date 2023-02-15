import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  producto: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {producto: 'Casaca'},
    {producto: 'Polo'},
    {producto: 'Blusa'},
    {producto: 'Casaca'},
    ];

@Component({
  selector: 'app-reg-producto',
  templateUrl: './reg-producto.component.html',
  styleUrls: ['./reg-producto.component.css']
})
export class RegProductoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RegProductoComponent>) { }
  
  displayedColumns: string[] = ['producto', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
