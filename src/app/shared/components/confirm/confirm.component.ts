import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  message: string = "Estas seguro de eliminar";
  constructor() { }

  ngOnInit(): void {
  }

}
