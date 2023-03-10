import { FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegMedidaComponent } from '../reg-medida/reg-medida.component';



@Component({
  selector: 'app-mante-medida',
  templateUrl: './mante-medida.component.html',
  styleUrls: ['./mante-medida.component.css']
})
export class ManteMedidaComponent implements OnInit {
  group:FormGroup

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegMedidaComponent, any> | undefined;

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
