import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

export interface RegMenus {
  menu: string;
  }

  const ELEMENT_DATA: RegMenus[] = [
    {menu: 'Menu A1'},
    {menu: 'Menu A2'},
    {menu: 'Menu A1'},
    {menu: 'Menu A1'},
    ];

@Component({
  selector: 'app-reg-menu',
  templateUrl: './reg-menu.component.html',
  styleUrls: ['./reg-menu.component.css']
})
export class RegMenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegMenuComponent>) { }
  
  displayedColumns: string[] = ['menu', 'opciones'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }
}