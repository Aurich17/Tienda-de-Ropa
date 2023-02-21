import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegPromocionesComponent } from '../reg-promociones/reg-promociones.component';

export interface MantenimientoRoles {
  desPromocion: string;
  codPromocion: number;
  monto: number;
  fecha: string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codPromocion: 1, desPromocion: 'Menu 1', monto:1200, fecha: '17/02/2022 - 07/09/2022', estado: 'activo',},
    {codPromocion: 2, desPromocion: 'Menu 2', monto:1200, fecha: '17/02/2022 - 07/09/2022', estado: 'activo',},
    {codPromocion: 3, desPromocion: 'Menu 3', monto:1200, fecha: '17/02/2022 - 07/09/2022', estado: 'activo',},
    {codPromocion: 4, desPromocion: 'Menu 4', monto:1200, fecha: '17/02/2022 - 07/09/2022', estado: 'activo',},
    ];

@Component({
  selector: 'app-mante-promociones',
  templateUrl: './mante-promociones.component.html',
  styleUrls: ['./mante-promociones.component.css']
})
export class MantePromocionesComponent implements OnInit {

  nivel='nivel'
  menus='menus'

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegPromocionesComponent, any> | undefined;

  displayedColumns: string[] = ['codPromocion', 'desPromocion', 'monto','fecha', 'estado', 'opciones'];
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
    this.modalDialog = this.matDialog.open(RegPromocionesComponent, this.dialogConfig);
  }

  ngOnInit(): void {
  }
}


