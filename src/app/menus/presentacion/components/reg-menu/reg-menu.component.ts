import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import { ImgSrcDirective } from '@angular/flex-layout';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DataSource} from '@angular/cdk/table';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table'; 
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

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