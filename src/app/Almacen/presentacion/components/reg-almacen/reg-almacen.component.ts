import { AlmacenResponse, ListaAlmacen } from './../../../domain/response/almacen_response';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  guardaalmacenrequest } from 'src/app/almacen/domain/request/almacen_request';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';

@Component({
  selector: 'app-reg-almacen',
  templateUrl: './reg-almacen.component.html',
  styleUrls: ['./reg-almacen.component.css']
})
export class RegAlmacenComponent implements OnInit {
  almacenResponse:AlmacenResponse
  group:FormGroup

  mygroup:FormGroup;
  initializeForm(){
    this.group = new FormGroup({
    desAlmacen : new FormControl (null,null),
    dirAlmacen : new FormControl (null, null),
    radio : new   FormControl(null,null),   
   });
   }

  constructor(private readonly almacenService : AlmacenRepository,private readonly  reference: MatDialogRef<RegAlmacenComponent>) { }
  

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardaalmacen(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaAlmacen: guardaalmacenrequest =<guardaalmacenrequest>{}
    
    requestGuardaAlmacen.Descripcion = valores['desAlmacen']
    requestGuardaAlmacen.Estado = valores['radio']
    requestGuardaAlmacen.Direccion = valores['dirAlmacen']
    requestGuardaAlmacen.Usuario_reg = 'Admin'
    requestGuardaAlmacen.Tipo = 'I'
    
    this.almacenService.guardaalmacen(requestGuardaAlmacen).subscribe(response=>
    {
      this.almacenResponse = response
      alert('GUARDADO CON EXITO')
    }
    )
  }
}
