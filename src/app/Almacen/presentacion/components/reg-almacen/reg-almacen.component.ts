import { AlmacenResponse } from './../../../../Almacen/domain/response/almacen_response';
import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  guardaalmacenrequest } from 'src/app/Almacen/domain/request/almacen_request';
import { AlmacenRepository } from 'src/app/Almacen/domain/almacen.repository';
import { UtilService } from '../../../../../../src/app/services/util.service';


//@ts-ignore
@Component({
  selector: 'app-reg-almacen',
  templateUrl: './reg-almacen.component.html',
  styleUrls: ['./reg-almacen.component.css']
})
export class RegAlmacenComponent implements OnInit {
  select: 'A'|'I' ='A'
  almacenResponse:AlmacenResponse | undefined
  group:FormGroup  = <FormGroup>{}
  almacenAgregar = []
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,Validators.required),
    direccion : new FormControl (null, Validators.required),
    radio : new   FormControl(null,Validators.required),
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
    const valores = this.group.value
      requestGuardaAlmacen.Descripcion = valores['descripcion']
      requestGuardaAlmacen.Direccion = valores['direccion']
      requestGuardaAlmacen.Estado = valores['radio']
      requestGuardaAlmacen.Usuario_reg = 'Admin'
      requestGuardaAlmacen.Tipo = 'I'

      this.almacenService.guardaalmacen(requestGuardaAlmacen).subscribe(response=>
      {
        this.almacenResponse = response
        this.util.showMessage('GUARDADO CON EXITO')
        this.closeModal()
      }
      )
  }
  clear(){
    this.group.reset({radio: 'A'})
  }
}
