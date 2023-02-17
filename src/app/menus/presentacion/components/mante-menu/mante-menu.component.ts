import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegMenuComponent } from '../reg-menu/reg-menu.component';

export interface MantenimientoRoles {
  menu: string;
  codUsuario: number;
  url: string;
  nivel: string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codUsuario: 2, menu: 'Menu 1', url:'URL', nivel: 'Menu A1', estado: 'activo',},
    {codUsuario: 3, menu: 'Menu 2', url:'URL', nivel: 'Menu A2', estado: 'activo',},
    {codUsuario: 4, menu: 'Menu 3', url:'URL', nivel: 'Menu A1', estado: 'activo',},
    {codUsuario: 5, menu: 'Menu 4', url:'URL', nivel: 'Menu A1', estado: 'activo',},
    ];

@Component({
  selector: 'app-mante-menu',
  templateUrl: './mante-menu.component.html',
  styleUrls: ['./mante-menu.component.css']
})
export class ManteMenuComponent implements OnInit {
  nivel='nivel'
  menus='menus'

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegMenuComponent, any> | undefined;

  displayedColumns: string[] = ['codUsuario', 'menu', 'nivel', 'url', 'estado', 'opciones'];
  dataSource = ELEMENT_DATA;


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
    this.modalDialog = this.matDialog.open(RegMenuComponent, this.dialogConfig);
  }

  ngOnInit(): void {
  }
}



