import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import {  PersonalResponse } from 'src/app/Personal/domain/response/personal_response';

import { DatePipe } from '@angular/common';
import { UtilService } from 'src/app/services/util.service';
import { PersonalRepository } from 'src/app/Personal/domain/personal.repository';
import { guardapersonalrequest } from 'src/app/Personal/domain/request/personal_request';


@Component({
  selector: 'app-reg-personal',
  templateUrl: './reg-personal.component.html',
  styleUrls: ['./reg-personal.component.css']
})
export class RegPersonalComponent implements OnInit {
  select: 'A'|'I' = 'A'
  fechaIngreso:string
  personalAgregar =[]; //ESTOS VALORES SON LOS QUE SE AGREGAn A LA TABLA CUANDO DE GUARDAR
  group:FormGroup
  area = 'area'
  personalResponse : PersonalResponse
  startDate = new Date(1990, 0, 1);
  personal = 'personal'

  initializeForm(){
    this.group = new FormGroup({
    nombre : new FormControl (null,Validators.required),
    apellido : new FormControl (null, Validators.required),
    dni : new   FormControl(null,Validators.required),
    fechaNacimiento : new   FormControl(null,Validators.required),
    telefono : new   FormControl(null,Validators.required),
    sueldo : new   FormControl(null,Validators.required),
    direccion : new   FormControl(null,null),
    fechaIngreso : new   FormControl(null,Validators.required),
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

  guarda(){//QUEDA PENDIENTE LAS DOS FILAS
    //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaPersonal: guardapersonalrequest =<guardapersonalrequest>{}
    const valores = this.group.value
    let fechaNacimiento = this.miDatePipe.transform(valores['fechaNacimiento'], "yyyy-MM-ddTHH:mm:ss")
    let fechaIngreso = this.miDatePipe.transform(valores['fechaIngreso'], "yyyy-MM-ddTHH:mm:ss")

    for(let i = 0 ; i < this.personalAgregar.length; i++){
      console.log('Este es el Array Nro: '+i);
      requestGuardaPersonal.CodigoPersonal = 0
      requestGuardaPersonal.nombres = valores['nombre']
      requestGuardaPersonal.apellidos = valores['apellido']
      requestGuardaPersonal.dni = valores['dni']
      requestGuardaPersonal.fecha_nac = fechaNacimiento
      requestGuardaPersonal.telefono = valores['telefono']
      requestGuardaPersonal.fecha_ing = fechaIngreso
      requestGuardaPersonal.sueldo = valores['sueldo']
      requestGuardaPersonal.direccion = valores['direccion']
      requestGuardaPersonal.Estado = valores['radio']
      requestGuardaPersonal.Usuario_reg = 'Admin'
      requestGuardaPersonal.Tipo = 'I'

      this.personalService.guardapersonal(requestGuardaPersonal).subscribe(response=>
      {
        this.personalResponse = response
        this.util.showMessage('GUARDADO CORRECTAMENTE');
        this.closeModal()
      }
      )
    }

  }
  clear() {
    this.group.reset({radio: 'A'})
  }
  SendDataonChange(event: any) {
    console.log(event.target.value);
    }
}
