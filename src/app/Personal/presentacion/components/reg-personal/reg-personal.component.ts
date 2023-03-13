import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import {  PersonalResponse } from 'src/app/personal/domain/response/personal_response';
import { PersonalRepository } from 'src/app/Personal/domain/personal.repository';
import { guardapersonalrequest } from 'src/app/Personal/domain/request/personal_request';
import { DatePipe } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-reg-personal',
  templateUrl: './reg-personal.component.html',
  styleUrls: ['./reg-personal.component.css']
})
export class RegPersonalComponent implements OnInit {
  fechaIngreso:string
  personalAgregar =[]; //ESTOS VALORES SON LOS QUE SE AGREGAn A LA TABLA CUANDO DE GUARDAR
  group:FormGroup
  area = 'area'
  personalResponse : PersonalResponse
  startDate = new Date(1990, 0, 1);
  personal = 'personal'

  initializeForm(){
    this.group = new FormGroup({
    nombre : new FormControl (null,null),
    apellido : new FormControl (null, null),
    dni : new   FormControl(null,null),
    areas : new   FormControl(null,null),
    fechaNacimiento : new   FormControl(null,null),
    telefono : new   FormControl(null,null),
    sueldo : new   FormControl(null,null),
    direccion : new   FormControl(null,null),
    fechaIngreso : new   FormControl(null,null),
    radio : new   FormControl(null,null), 
   });
   }

  constructor(private readonly personalService : PersonalRepository,private readonly  reference: MatDialogRef<RegPersonalComponent>, private miDatePipe: DatePipe,  private readonly util: UtilService) { }

  ngOnInit(): void {
    console.log('Se a inicializado el REG-PERSONAL');
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardapersonal(){
    //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaPersonal: guardapersonalrequest =<guardapersonalrequest>{}

    for(let i = 0 ; i < this.personalAgregar.length; i++){
      console.log('Este es el Array Nro: '+i);
      requestGuardaPersonal.CodigoPersonal = 0
      requestGuardaPersonal.nombres = this.personalAgregar[i][0]
      requestGuardaPersonal.apellidos = this.personalAgregar[i][1]
      requestGuardaPersonal.dni = this.personalAgregar[i][2]
      requestGuardaPersonal.fecha_nac = this.personalAgregar[i][3]
      requestGuardaPersonal.telefono = this.personalAgregar[i][4]
      requestGuardaPersonal.fecha_ing = this.personalAgregar[i][5]
      requestGuardaPersonal.sueldo = this.personalAgregar[i][6]
      requestGuardaPersonal.direccion = this.personalAgregar[i][7]
      requestGuardaPersonal.Estado = this.personalAgregar[i][8]
      requestGuardaPersonal.Usuario_reg = 'Admin'
      requestGuardaPersonal.Tipo = 'I'
      
      this.personalService.guardapersonal(requestGuardaPersonal).subscribe(response=>
      {
        this.personalResponse = response
      }
      )
    }
    this.util.showMessage('Guardado con Exito');
  }
  mostrarLista(){
    const valores = this.group.value
    let lista = [];
    let fechaNacimiento = this.miDatePipe.transform(valores['fechaNacimiento'], "yyyy-MM-ddTHH:mm:ss")
    let fechaIngreso = this.miDatePipe.transform(valores['fechaIngreso'], "yyyy-MM-ddTHH:mm:ss")


    lista.push(valores['nombre'])
    lista.push(valores['apellido'])
    lista.push(valores['dni'])
    lista.push(fechaNacimiento)
    lista.push(valores['telefono'])
    lista.push(fechaIngreso)
    lista.push(valores['sueldo'])
    lista.push(valores['direccion'])
    lista.push(valores['radio'])
    this.personalAgregar.push(lista)

     console.log('Tamano del array: '+this.personalAgregar.length)
    for(let i = 0 ; i < this.personalAgregar.length; i++){
       console.log(this.personalAgregar[i]);
     }
  }
  clear() {
    this.group.reset();
  }
  SendDataonChange(event: any) {
    console.log(event.target.value);
    }
}
