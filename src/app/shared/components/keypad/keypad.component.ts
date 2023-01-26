import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyPadButton } from 'src/app/interfaces/keypad-button.interface';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  @Input() statusButton:boolean;
  @Input() keypadButtons: KeyPadButton[];
  @Output() clickButton: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
   
  }

  action(act:string){

    this.clickButton.emit(act);
  }

}
