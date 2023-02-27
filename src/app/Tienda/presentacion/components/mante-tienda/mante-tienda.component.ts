import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegTiendaComponent } from '../reg-tienda/reg-tienda.component';

export interface MantenimientoRoles {
  tienda: string;
  codTienda: number;
  direccion: string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codTienda: 1, tienda: 'TiendaA', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    {codTienda: 2, tienda: 'TiendaB', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    {codTienda: 3, tienda: 'TiendaC', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    {codTienda: 4, tienda: 'TiendaD', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    ];

@Component({
  selector: 'app-mante-tienda',
  templateUrl: './mante-tienda.component.html',
  styleUrls: ['./mante-tienda.component.css']
})
export class ManteTiendaComponent implements OnInit {

  usuario='usuario';
  roles='roles';
  menu='menu';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegTiendaComponent, any> | undefined;
  displayedColumns: string[] = ['codTienda', 'tienda', 'direccion', 'estado', 'opciones'];
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
    this.modalDialog = this.matDialog.open(RegTiendaComponent, this.dialogConfig);
  }
  ngOnInit(): void {
  }

}
