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
