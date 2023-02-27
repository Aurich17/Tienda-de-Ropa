import { Component, OnInit } from '@angular/core';
import { LoginUserCU } from 'src/app/usuario/application/user-logincu';
import { UserEntity } from 'src/app/usuario/domain/user-entity';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  

  constructor(private userlogincu: LoginUserCU) { }

  ngOnInit(): void {
  }

   setCredentials(user: UserEntity){
    //console.log(value);
    //Enviar a la capa de aplicacion 
    //tiene que llamar al controlador userlogincaseuse
    this.userlogincu.login(user);
    
  }

}
