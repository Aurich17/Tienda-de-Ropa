import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegLotesComponent } from '../reg-lotes/reg-lotes.component';

export interface MantenimientoRoles {
  lote: string;
  codLote: number;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codLote: 1, lote: 'Almacen_A' , estado: 'activo',},
    {codLote: 2, lote: 'Almacen_B' , estado: 'activo',},
    {codLote: 3, lote: 'Almacen_C' , estado: 'activo',},
    {codLote: 4, lote: 'Almacen_D' , estado: 'activo',},
    ];

@Component({
  selector: 'app-mante-lotes',
  templateUrl: './mante-lotes.component.html',
  styleUrls: ['./mante-lotes.component.css']
})
export class ManteLotesComponent implements OnInit {

  usuario='usuario';
  roles='roles';
  menu='menu';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegLotesComponent, any> | undefined;
  displayedColumns: string[] = ['codLote', 'lote', 'estado', 'opciones'];
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
    this.modalDialog = this.matDialog.open(RegLotesComponent, this.dialogConfig);
  }
  ngOnInit(): void {
  }

}
