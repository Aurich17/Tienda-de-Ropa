import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegPersonalComponent } from '../reg-personal/reg-personal.component';

export interface MantenimientoRoles {
  nomPersonal: string;
  codPersonal: number;
  dni: string;
  sueldo: string;
  area: string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codPersonal: 1, nomPersonal: 'Nombre_Personal_1', dni:'71609237', sueldo: 'S/1200', area:'RRHH',estado: 'activo',},
    {codPersonal: 2, nomPersonal: 'Nombre_Personal_2', dni:'71609237', sueldo: 'S/1200', area:'RRHH',estado: 'activo',},
    {codPersonal: 3, nomPersonal: 'Nombre_Personal_3', dni:'71609237', sueldo: 'S/1200', area:'RRHH',estado: 'activo',},
    {codPersonal: 4, nomPersonal: 'Nombre_Personal_4', dni:'71609237', sueldo: 'S/1200', area:'RRHH',estado: 'activo',},
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
  selector: 'app-mante-personal',
  templateUrl: './mante-personal.component.html',
  styleUrls: ['./mante-personal.component.css']
})
export class MantePersonalComponent implements OnInit {

  colores = 'colores';
  tallas = 'tallas';
  prendas = 'prendas';
  area = 'area';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegPersonalComponent, any> | undefined;

  displayedColumns: string[] = ['codPersonal', 'nomPersonal', 'dni', 'sueldo', 'area','estado', 'opciones'];
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
    this.dialogConfig.height = "1000px";
    this.dialogConfig.width = "700px";
    this.modalDialog = this.matDialog.open(RegPersonalComponent, this.dialogConfig);
  }

  ngOnInit(): void {
  }

}
