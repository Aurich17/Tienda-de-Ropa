import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserEntity } from 'src/app/usuario/domain/user-entity';
//import * as EventEmitter from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() outputLogin:EventEmitter<UserEntity>= new EventEmitter<UserEntity>();

  group: FormGroup;

  usuario : "";
  constructor() { }

  ngOnInit(): void {

    this.initializeForm();
  }


initializeForm(){
 this.group = new FormGroup({
 usuario : new FormControl (null,Validators.required),
 password: new FormControl(null,Validators.required),
});
}

  login(){

    const user: UserEntity = this.group.value;
    this.outputLogin.emit(this.group.value);
    // console.log(this.group);

  }

   handleKeyDown(event: any)
{
    if (event.keyCode == 13)
    {
       // action
       this.login();
    }
    else if (event.keyCode == 40)
    {
        // action
    }  
    else if (event.keyCode == 38)
    {
        // action
    }    
}

  capturar(value) {

    //this.usuario = evt.target.value;
    console.log(value.target.value)
  }

}
