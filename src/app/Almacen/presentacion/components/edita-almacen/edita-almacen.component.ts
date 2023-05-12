
import { AlmacenResponse, ListaAlmacen } from './../../../../almacen/domain/response/almacen_response';
import {DIALOG_DATA, DialogModule, DialogRef} from '@angular/cdk/dialog';
import { AlmacenRepository } from '../../../../almacen/domain/almacen.repository';
import { UtilService } from '../../../../services/util.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Directive, Inject, OnInit } from '@angular/core';

import { editaalmacenrequest } from '../../../../almacen/domain/request/almacen_request';




@Component({

  selector: 'app-edita-almacen',
  templateUrl: './edita-almacen.component.html',
  styleUrls: ['./edita-almacen.component.css']
})

export class EditaAlmacenComponent implements OnInit {
  group:any
  codigoAlmacen:number = 0
  almacenResponse:AlmacenResponse = <AlmacenResponse>{}
  initializeForm(){
    this.group = new FormGroup({
    desAlmacen : new FormControl (this.data?.descripcion,Validators.required),
    radio : new   FormControl(this.data?.estado,null),
    direccion : new FormControl(this.data?.direccion,Validators.required),
   });
  }

  @Inject(DIALOG_DATA) private data : ListaAlmacen = <ListaAlmacen>{}
  constructor(private readonly almacenService : AlmacenRepository,private readonly  reference: DialogRef<EditaAlmacenComponent>,private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoAlmacen= this.data?.codigoAlmacen
  }

  closeModal() {
    this.reference.close();
  }

  editaalmacen(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaAlmacen: editaalmacenrequest =<editaalmacenrequest>{}

    requestEditaAlmacen.CodigoAlmacen = this.codigoAlmacen.toString()
    requestEditaAlmacen.Descripcion = valores['desAlmacen']
    requestEditaAlmacen.Estado = valores['radio']
    requestEditaAlmacen.Usuario_reg = 'Admin'
    requestEditaAlmacen.Direccion = valores['direccion']
    requestEditaAlmacen.Tipo = 'U'

    this.almacenService.editaalmacen(requestEditaAlmacen).subscribe(response=>
    {
      this.almacenResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE')
      this.closeModal()
    }

    )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }

}
