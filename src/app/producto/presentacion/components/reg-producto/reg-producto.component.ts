import { FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reg-producto',
  templateUrl: './reg-producto.component.html',
  styleUrls: ['./reg-producto.component.css']
})
export class RegProductoComponent implements OnInit {
  group:FormGroup


  constructor(public dialogRef: MatDialogRef<RegProductoComponent>) { }
  

  ngOnInit(): void {
  }
  closeModal() {
    this.dialogRef.close();
  }

}
