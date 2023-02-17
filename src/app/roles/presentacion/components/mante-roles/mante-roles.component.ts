import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegRolesComponent } from '../reg-roles/reg-roles.component';

export interface MantenimientoRoles {
  usuario: string;
  codUsuario: number;
  rol: string;
  menu: string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codUsuario: 2, usuario: 'Usuario1', rol:'rol1', menu: 'Menu A1', estado: 'activo',},
    {codUsuario: 3, usuario: 'Usuario2', rol:'rol1', menu: 'Menu A2', estado: 'activo',},
    {codUsuario: 4, usuario: 'Usuario3', rol:'rol1', menu: 'Menu A1', estado: 'activo',},
    {codUsuario: 5, usuario: 'Usuario4', rol:'rol1', menu: 'Menu A1', estado: 'activo',},
    ];

@Component({
  selector: 'app-mante-roles',
  templateUrl: './mante-roles.component.html',
  styleUrls: ['./mante-roles.component.css']
})
export class ManteRolesComponent implements OnInit {
  usuario='usuario';
  roles='roles';
  menu='menu';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegRolesComponent, any> | undefined;
  displayedColumns: string[] = ['codUsuario', 'usuario', 'rol', 'menu', 'estado', 'opciones'];
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
    this.modalDialog = this.matDialog.open(RegRolesComponent, this.dialogConfig);
  }

  ngOnInit(): void {
  }

}
