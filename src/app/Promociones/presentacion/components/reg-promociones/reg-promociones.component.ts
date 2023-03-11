import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import {  PromocionResponse } from 'src/app/Promociones/domain/response/promociones_response';
import { PromocionRepository } from 'src/app/Promociones/domain/promociones.repository';
import { guardapromocionrequest } from 'src/app/Promociones/domain/request/promociones_request';

@Component({
  selector: 'app-reg-promociones',
  templateUrl: './reg-promociones.component.html',
  styleUrls: ['./reg-promociones.component.css']
})
export class RegPromocionesComponent implements OnInit {
  promocionAgregar =[];
  promocionResponse:PromocionResponse
  group:FormGroup;
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,null),
    radio : new   FormControl(null,null),   
   });
   }
  constructor(private readonly  promocionService : PromocionRepository,private readonly  reference: MatDialogRef<RegPromocionesComponent>) { }
  

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardaPromocion(){
    const requestGuardaPromocion: guardapromocionrequest =<guardapromocionrequest>{}
    
    for(let i = 0 ; i < this.promocionAgregar.length; i++){
      console.log('Este es el Array Nro: '+i);
      requestGuardaPromocion.Descripcion = this.promocionAgregar[i][0]
      requestGuardaPromocion.Estado = this.promocionAgregar[i][1]
      requestGuardaPromocion.Usuario = 'Admin'
      requestGuardaPromocion.Tipo = 'I'
      
      this.promocionService.guardapromocion(requestGuardaPromocion).subscribe(response=>
      {
        this.promocionResponse = response
      }
      )
    }
    alert('GUARDADO CON EXITO');
  }
  mostrarLista(){
    const valores = this.group.value
    let lista = [];

    lista.push(valores['descripcion'])
    lista.push(valores['radio'])
    
    this.promocionAgregar.push(lista)
    console.log('Tamano del array: '+this.promocionAgregar.length)
    for(let i = 0 ; i < this.promocionAgregar.length; i++){
       console.log(this.promocionAgregar[i]);
     }
  }
}
