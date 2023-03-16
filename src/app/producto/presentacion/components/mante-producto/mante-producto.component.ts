import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegProductoComponent } from '../reg-producto/reg-producto.component';



@Component({
  selector: 'app-mante-producto',
  templateUrl: './mante-producto.component.html',
  styleUrls: ['./mante-producto.component.css']
})
export class ManteProductoComponent implements OnInit {
  
  colores = 'colores';
  tallas = 'tallas';
  prendas = 'prendas';
  genero = 'genero';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegProductoComponent, any> | undefined;

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
