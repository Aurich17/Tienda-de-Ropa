import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
 private messageErrors ={

  requiiered: 'campo requerido',
  email : 'No es un correo'

 }
  constructor() { }

  getMessage(typeError:string): string {
    
    return  this.messageErrors[typeError]

  }
}
