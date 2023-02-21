import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegMedidaComponent } from '../reg-medida/reg-medida.component';

export interface MantenimientoRoles {
  medida: string;
  codMedida: number;
  estado: string;
  }

  const ELEMENT_DATA: MantenimientoRoles[] = [
    {codMedida: 1, medida: 'Medida A' , estado: 'activo',},
    {codMedida: 2, medida: 'Medida B' , estado: 'activo',},
    {codMedida: 3, medida: 'Medida C' , estado: 'activo',},
    {codMedida: 4, medida: 'Medida D' , estado: 'activo',},
    ];

@Component({
  selector: 'app-mante-medida',
  templateUrl: './mante-medida.component.html',
  styleUrls: ['./mante-medida.component.css']
})
export class ManteMedidaComponent implements OnInit {

  usuario='usuario';
  roles='roles';
  menu='menu';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegMedidaComponent, any> | undefined;
  displayedColumns: string[] = ['codMedida', 'medida', 'estado', 'opciones'];
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
    this.modalDialog = this.matDialog.open(RegMedidaComponent, this.dialogConfig);
  }
  ngOnInit(): void {
  }

}
