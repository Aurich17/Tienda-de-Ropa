import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


//@ts-ignore
@Component({
  selector: 'app-dialogoconfirmacion',
  templateUrl: './dialogoconfirmacion.component.html',
  styleUrls: ['./dialogoconfirmacion.component.css']
})
export class DialogoConfirmacionComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }
    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }
  ngOnInit() {
  }
}
