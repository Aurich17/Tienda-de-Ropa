import { AlmacenResponse, ListaAlmacen } from './../../../domain/response/almacen_response';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editaalmacenrequest } from 'src/app/almacen/domain/request/almacen_request';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-edita-almacen',
  templateUrl: './edita-almacen.component.html',
  styleUrls: ['./edita-almacen.component.css']
})
export class EditaAlmacenComponent implements OnInit {
  group:FormGroup
  codigoAlmacen:number
  almacenResponse:AlmacenResponse
  initializeForm(){
    this.group = new FormGroup({
    desAlmacen : new FormControl (this.data?.descripcion,Validators.required),
    radio : new   FormControl(this.data?.estado,null),
    direccion : new FormControl(this.data?.direccion,Validators.required),
   });
  }
  constructor(private readonly almacenService : AlmacenRepository, @Inject(MAT_DIALOG_DATA) private data : ListaAlmacen,private readonly  reference: MatDialogRef<EditaAlmacenComponent>,private readonly util: UtilService) { }

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
