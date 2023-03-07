import { PersonalResponse, ListaPersonal } from './../../../domain/response/personal_response';
import { MantePersonalComponent} from './../mante-personal/mante-personal.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editaalmacenrequest, guardaalmacenrequest, almacenrequest } from 'src/app/almacen/domain/request/almacen_request';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';
import { PersonalRepository } from 'src/app/Personal/domain/personal.repository';
import { editapersonalrequest } from 'src/app/Personal/domain/request/personal_request';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edita-personal',
  templateUrl: './edita-personal.component.html',
  styleUrls: ['./edita-personal.component.css']
})
export class EditaPersonalComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  group:FormGroup
  codigoPersonal:number
  personalResponse:PersonalResponse
  mygroup:FormGroup;
  initializeForm(){
    this.group = new FormGroup({
    nombre : new FormControl (this.data?.nombres,null),
    apellido : new FormControl (this.data?.apellidos, null),
    dni : new   FormControl(this.data?.dni,null),
    fechaNacimiento : new   FormControl(this.data?.fecha_nac,null),
    telefono : new   FormControl(this.data?.telefono,null),
    sueldo : new   FormControl(this.data?.sueldo,null),
    direccion : new   FormControl(this.data?.direccion,null),
    fechaIngreso : new   FormControl(this.data?.fecha_ing,null),
    radio : new   FormControl(this.data?.estado,null), 
   });
   }
  constructor(private readonly personalService : PersonalRepository, @Inject(MAT_DIALOG_DATA) private data : ListaPersonal,private readonly  reference: MatDialogRef<EditaPersonalComponent>, private miDatePipe: DatePipe) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoPersonal= this.data?.codigoPersonal
    alert(this.data?.codigoPersonal)
  }

  closeModal() {
    this.reference.close();
  }

  editaPersonal(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaPersonal: editapersonalrequest =<editapersonalrequest>{}
    
    requestEditaPersonal.CodigoPersonal = this.codigoPersonal
    requestEditaPersonal.nombres = valores['nombre']
    requestEditaPersonal.apellidos = valores['apellido']
    requestEditaPersonal.dni = valores['dni']
    requestEditaPersonal.fecha_nac = this.miDatePipe.transform(valores['fechaNacimiento'], "yyyy-MM-ddTHH:mm:ss")
    requestEditaPersonal.telefono = valores['telefono']
    requestEditaPersonal.fecha_ing = this.miDatePipe.transform(valores['fechaIngreso'], "yyyy-MM-ddTHH:mm:ss")
    requestEditaPersonal.sueldo = valores['sueldo']
    requestEditaPersonal.direccion = valores['direccion']
    requestEditaPersonal.Estado = valores['radio']
    requestEditaPersonal.Usuario_reg = 'Admin'
    requestEditaPersonal.Tipo = 'U'
    
    this.personalService.editapersonal(requestEditaPersonal).subscribe(response=>
    {
      this.personalResponse = response
      alert('eDITADO CORRECTAMENTE');
    }
    
    )
  }  

}
