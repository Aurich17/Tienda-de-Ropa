import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  personal: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {personal: 'Personal A1'},
    {personal: 'Personal A2'},
    {personal: 'Personal A1'},
    {personal: 'Personal A1'},
    ];

@Component({
  selector: 'app-reg-personal',
  templateUrl: './reg-personal.component.html',
  styleUrls: ['./reg-personal.component.css']
})
export class RegPersonalComponent implements OnInit {
  area = 'area'
  startDate = new Date(1990, 0, 1);
  personal = 'personal'

  constructor(public dialogRef: MatDialogRef<RegPersonalComponent>) { }
  
  displayedColumns: string[] = ['personal', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
