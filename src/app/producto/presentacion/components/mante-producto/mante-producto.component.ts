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
import { RegProductoComponent } from '../reg-producto/reg-producto.component';

export interface MantenimientoRoles {
  desProducto: string;
  codProducto: number;
  color: string;
  talla: string;
  tipPrenda: string;
  genero:string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codProducto: 1, desProducto: 'DesProducto1', color:'Azul', talla: 'Menu A1', tipPrenda:'Polo',genero:'M' ,estado: 'activo',},
    {codProducto: 3, desProducto: 'DesProducto2', color:'Rojo', talla: 'Menu A2', tipPrenda:'Polo',genero:'F' ,estado: 'activo',},
    {codProducto: 4, desProducto: 'DesProducto3', color:'Verde', talla: 'Menu A1', tipPrenda:'Polo',genero:'M' ,estado: 'activo',},
    {codProducto: 5, desProducto: 'DesProducto4', color:'Blanco', talla: 'Menu A1', tipPrenda:'Polo',genero:'F' ,estado: 'activo',},
    ];

  interface Roles {
    value: string;
    viewValue: string;
  }
  interface Menus {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-mante-producto',
  templateUrl: './mante-producto.component.html',
  styleUrls: ['./mante-producto.component.css']
})
export class ManteProductoComponent implements OnInit {

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegProductoComponent, any> | undefined;

  displayedColumns: string[] = ['codProducto', 'desProducto', 'color', 'talla', 'tipPrenda', 'genero','estado', 'opciones'];
  dataSource = ELEMENT_DATA;
  //Roles
  Roles: Roles[] = [
    {value: 'rol1', viewValue: 'Rol1'},
    {value: 'rol2', viewValue: 'Rol2'},
    {value: 'rol3', viewValue: 'Rol3'},
  ];
  //Menus
  Menus: Menus[] = [
    {value: 'menu1', viewValue: 'MenuA1'},
    {value: 'menu2', viewValue: 'MenuA2'},
    {value: 'menu3', viewValue: 'MenuA3'},
  ];


  constructor(public matDialog: MatDialog) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }

  openModal() {
    
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "800px";
    this.dialogConfig.width = "700px";
    this.modalDialog = this.matDialog.open(RegProductoComponent, this.dialogConfig);
  }

  ngOnInit(): void {
  }

}
