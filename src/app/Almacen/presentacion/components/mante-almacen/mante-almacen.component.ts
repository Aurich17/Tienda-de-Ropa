import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegAlmacenComponent } from '../reg-almacen/reg-almacen.component';

export interface MantenimientoRoles {
  almacen: string;
  codAlmacen: number;
  direccion: string;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codAlmacen: 1, almacen: 'Almacen_A', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    {codAlmacen: 2, almacen: 'Almacen_B', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    {codAlmacen: 3, almacen: 'Almacen_C', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    {codAlmacen: 4, almacen: 'Almacen_D', direccion:'Centro 6300 Tepic, Nay Mexico', estado: 'activo',},
    ];

@Component({
  selector: 'app-mante-almacen',
  templateUrl: './mante-almacen.component.html',
  styleUrls: ['./mante-almacen.component.css']
})
export class ManteAlmacenComponent implements OnInit {

  usuario='usuario';
  roles='roles';
  menu='menu';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegAlmacenComponent, any> | undefined;
  displayedColumns: string[] = ['codAlmacen', 'almacen', 'direccion', 'estado', 'opciones'];
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
    this.modalDialog = this.matDialog.open(RegAlmacenComponent, this.dialogConfig);
  }
  ngOnInit(): void {
  }

}
