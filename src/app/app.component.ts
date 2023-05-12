import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserRepository } from './usuario/domain/user-repository';
import { UserOperations } from './usuario/infraestructura/user-operation';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  userLogged = false;
  title = 'SistemasKopito';
  /*constructor (private readonly injector: Injector){

  const user : any = this.injector.get(UserRepository)//Para llamar instancias que ya estan creadas
  this.userLogged = user.userLogged;
  user.onchangeStatusUser.subscribe((status:boolean) => this.userLogged = status)

  }
  */

  constructor(private readonly auth: AuthService){

 
    this.auth
    .getChangeStatusUser()
    .subscribe((status: boolean) => (this.userLogged = status));

    if (this.userLogged===false ){
    
      this.userLogged= auth.getListaUseSession()

    }
    
  }
}
