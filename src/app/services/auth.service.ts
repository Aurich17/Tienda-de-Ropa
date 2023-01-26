import { getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interfaces/auth.services';
import { Tokens } from '../interfaces/tokens.interface';
import { Menu, ResponseLogin, UserEntity } from '../usuario/domain/user-entity';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements IAuth {
   private onChangeStatusUser = new Subject<boolean>();
  constructor(
    private readonly util: UtilService,
    private http: HttpClient,
    private readonly storage:StorageService,
    private readonly router: Router
    )
     { }

     listausuarioMenu : ResponseLogin = <ResponseLogin>{}
userLogged = false

getListaMenu (): ResponseLogin {

  
  return this.listausuarioMenu

}


getMenuF5(): Menu
{
    return JSON.parse(this.storage.get("menu"))
  
}

getListaUseSession(): boolean
{
  
  if  (this.storage.get('userLogged')==="true"){

     this.userLogged = true ;

  }else {
    this.userLogged = false
  }

  
  //this.onChangeStatusUser.next(true);


  return this.userLogged
}

login(user: UserEntity): ResponseLogin {
  //// const StorageService = new StorageService();
       // se comenta hasta que tengamos la api

//const headers = new HttpHeaders();
//headers.append("Access-Control-Allow-Origin", "http://localhost:4200/");
//headers.append("Content-Type", "application/json");
//headers.append("Accept", "application/json");
//headers.append("Access-Control-Allow-Methods", "POST");
//headers.append("Access-Control-Allow-Headers", "Content-Type");

const listausuario : ResponseLogin = <ResponseLogin>{}
  this.http
   .post(`${environment.PATH_API}/autenticacion/login`,user)
   .subscribe((data: Tokens) => {
      this.storage.save('accessToken',data.datos.result.token);
      this.storage.save('usuario',data.datos.result.nombreUsuario);
      this.storage.save('codusuario',user.usuario);
      this.storage.save('codcompania',data.datos.result.codigoCompañia);
      this.storage.save('compania',data.datos.result.nombreCompañia);
      this.storage.save('userLogged',"true");
     this.storage.save('rol',data.datos.result.menu.codigoRol.toString())
      listausuario.datos =data.datos
      this.listausuarioMenu= data
      //this.storage.save('refreshToken', data.refreshToken)
      this.userLogged = true
     // alert(data.datos.result.nombreUsuario);
      this.onChangeStatusUser.next(true)
      this.router.navigate(['dashboard'])

      this.storage.save("menu", JSON.stringify(data.datos.result.menu))

      
   },(errorServicio)=>{
    this.util.showMessage( errorServicio.error.meta.mensaje);
    //this.dataTable = [];
});

   return listausuario; 
//this.userLogged = true
//this.onChangeStatusUser.next(true)
}

logout():void {

  this.userLogged=false;
  this.storage.clear();
  this.onChangeStatusUser.next(false);
  this.router.navigate(['/']);

}

  getChangeStatusUser():Observable<boolean>{

    return this.onChangeStatusUser.
    asObservable();

  }
}



