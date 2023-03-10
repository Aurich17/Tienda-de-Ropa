import { TiendaResponse} from './../../../domain/response/tienda_response';
import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {guardatiendarequest } from 'src/app/Tienda/domain/request/tienda_request';
import {TiendaRepository } from 'src/app/Tienda/domain/tienda.repository';


@Component({
  selector: 'app-reg-tienda',
  templateUrl: './reg-tienda.component.html',
  styleUrls: ['./reg-tienda.component.css']
})
export class RegTiendaComponent implements OnInit {
  tiendaAgregar =[]; //ESTOS VALORES SON LOS QUE SE AGREGAn A LA TABLA CUANDO DE GUARDAR
  group:FormGroup
  tiendaResponse : TiendaResponse
  tienda:string

  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,null),
    direccion : new FormControl (null, null),
    radio : new   FormControl(null,null),
   });
   }

  constructor(private readonly tiendaService : TiendaRepository,private readonly  reference: MatDialogRef<RegTiendaComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardatienda(){
    //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaTienda: guardatiendarequest =<guardatiendarequest>{}

    for(let i = 0 ; i < this.tiendaAgregar.length; i++){
      console.log('Este es el Array Nro: '+i);
      requestGuardaTienda.Descripcion = this.tiendaAgregar[i][0]
      requestGuardaTienda.Direccion = this.tiendaAgregar[i][1]
      requestGuardaTienda.Estado = this.tiendaAgregar[i][2]
      requestGuardaTienda.Usuario_reg = 'Admin'
      requestGuardaTienda.Tipo = 'I'
      
      this.tiendaService.guardatienda(requestGuardaTienda).subscribe(response=>
      {
        this.tiendaResponse = response
      }
      )
    }
    alert('GUARDADO CON EXITO');
  }
  mostrarLista(){
    const valores = this.group.value
    let lista = [];

    lista.push(valores['descripcion'])
    lista.push(valores['direccion'])
    lista.push(valores['radio'])
    this.tiendaAgregar.push(lista)

     console.log('Tamano del array: '+this.tiendaAgregar.length)
    for(let i = 0 ; i < this.tiendaAgregar.length; i++){
       console.log(this.tiendaAgregar[i]);
     }
  }
  SendDataonChange(event: any) {
    console.log(event.target.value);
    }
  
}
