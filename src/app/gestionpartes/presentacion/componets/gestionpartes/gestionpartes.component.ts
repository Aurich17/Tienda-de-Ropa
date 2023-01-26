import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { ResponseLogin } from 'src/app/usuario/domain/user-entity';


@Component({
  selector: 'app-gestionpartes',
  templateUrl: './gestionpartes.component.html',
  styleUrls: ['./gestionpartes.component.css']
})
export class GestionpartesComponent implements OnInit {

  constructor(private readonly router:Router,private readonly auth: AuthService,
    private readonly util: UtilService,private readonly storage :StorageService,) { }
 
   Heroes:{id:number, name:string}[];
   path :string ;
   pathv:string ;


   isHabilitado: boolean;
   isHabilitado2:boolean

   reponseLogin : ResponseLogin;
    
  ngOnInit(): void {
    this.ImagePath = './assets/Img/LOGOLYS.png';
    this.path = '/aperturapartes';
    this.pathv= '/vizualizarparte';
     this.Heroes =  [
      {id: 1, name:'Superman'},
      {id: 2, name:'Batman'},
      {id: 5, name:'BatGirl'},
      {id: 3, name:'Robin'},
      {id: 4, name:'Flash'}
  ];

  this.reponseLogin = this.auth.getListaMenu()

  //.log( this.reponseLogin)

  const codigorol =this.storage.get("rol").toString()

 
 if  (codigorol==='1'){

  this.isHabilitado = true ;
  this.isHabilitado2 = true ;

 }else {

  this.isHabilitado = false ;
  this.isHabilitado2=true 
 }

 if ((codigorol=='2') || (codigorol=='3')) {
  this.isHabilitado = true ;
}



  }

  ImagePath = 'path goes here';

  ImageClick() {
     
    alert('prueba');
      
  }

  goto (path:string): void {

    this.router.navigate([path])
 
   }

   gotov (path:string): void {

    this.router.navigate([path])
 
   }

   gotofinal (path:string): void {

    const codigorol =this.storage.get("rol").toString()

    if  ((codigorol==='1') || (codigorol==='2')|| (codigorol==='3')){
       this.router.navigate([path])
    }else{

      this.util.showMessage( "No tiene autorizacion para usar esta opcion");
      
    }
 
   }
   
   gotoinforme (path:string): void {

    //if  (this.reponseLogin.datos.result.menu.codigoRol===1){

    this.router.navigate([path])
 
   // }else

   // this.util.showMessage( "No tiene autorizacion para usar esta opcion");
   // {


    //}

   }
   
 

}
