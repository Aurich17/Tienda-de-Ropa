import { AlmacenResponse, ListaAlmacen } from './../../../domain/response/almacen_response';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  guardaalmacenrequest } from 'src/app/almacen/domain/request/almacen_request';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-reg-almacen',
  templateUrl: './reg-almacen.component.html',
  styleUrls: ['./reg-almacen.component.css']
})
export class RegAlmacenComponent implements OnInit {
  almacenResponse:AlmacenResponse
  group:FormGroup
  almacenAgregar = []
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,null),
    direccion : new FormControl (null, null),
    radio : new   FormControl(null,null),   
   });
   }

  constructor(private readonly almacenService : AlmacenRepository,private readonly  reference: MatDialogRef<RegAlmacenComponent>, private readonly util: UtilService) { }
  

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardaalmacen(){
    const requestGuardaAlmacen: guardaalmacenrequest =<guardaalmacenrequest>{}
    for(let i = 0 ; i < this.almacenAgregar.length; i++){
      console.log('Este es el Array Nro: '+i);
      requestGuardaAlmacen.Descripcion = this.almacenAgregar[i][0]
      requestGuardaAlmacen.Direccion = this.almacenAgregar[i][1]
      requestGuardaAlmacen.Estado = this.almacenAgregar[i][2]
      requestGuardaAlmacen.Usuario_reg = 'Admin'
      requestGuardaAlmacen.Tipo = 'I'
      
      this.almacenService.guardaalmacen(requestGuardaAlmacen).subscribe(response=>
      {
        this.almacenResponse = response
      }
      )
    }
    this.util.showMessage('Guardado con Exito')
  }
  mostrarLista(){
    const valores = this.group.value
    let lista = [];

    lista.push(valores['descripcion'])
    lista.push(valores['direccion'])
    lista.push(valores['radio'])
    
    this.almacenAgregar.push(lista)
    console.log('Tamano del array: '+this.almacenAgregar.length)
    for(let i = 0 ; i < this.almacenAgregar.length; i++){
       console.log(this.almacenAgregar[i]);
     }
  }
  clear() {
    this.group.reset();
  }
}
