import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ResponseLogin, UserEntity } from "../domain/user-entity";
import { UserRepository } from "../domain/user-repository";
import { UserOperations } from "../infraestructura/user-operation";

//para que se instacie una sola vez ahy que indicarle que es un servicio
@Injectable({
providedIn: 'root', //para que se puedaver desde cualquier componente

})
export class LoginUserCU{

  constructor(private readonly auth: AuthService, 
              private readonly userRepository: UserRepository
  ){}

    login(user: UserEntity): ResponseLogin {
      return this.auth.login(user);
     };

     logout(){
      this.auth.logout();

     }

}