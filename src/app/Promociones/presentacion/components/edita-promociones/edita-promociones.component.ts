
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

import { editapromocionrequest } from 'src/app/Promociones/domain/request/promociones_request';
import { PromocionRepository } from 'src/app/Promociones/domain/promociones.repository';
import { UtilService } from 'src/app/services/util.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaPromocion, PromocionResponse } from 'src/app/Promociones/domain/response/promociones_response';
@Component({
  selector: 'app-edita-promociones',
  templateUrl: './edita-promociones.component.html',
  styleUrls: ['./edita-promociones.component.css']
})
export class EditaPromocionesComponent implements OnInit {
  group:FormGroup
  codigoPromocion:number
  promocionResponse:PromocionResponse
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (this.data?.descripcion,Validators.required),
    radio : new   FormControl(this.data?.estado,Validators.required),
   });
  }

  constructor(private readonly promocionService : PromocionRepository, @Inject(MAT_DIALOG_DATA) private data : ListaPromocion,private readonly  reference: MatDialogRef<EditaPromocionesComponent>, private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoPromocion= this.data?.codigoPromocion
  }

  closeModal() {
    this.reference.close();
  }

  editaPromocion(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaPromocion: editapromocionrequest =<editapromocionrequest>{}
    
    requestEditaPromocion.CodigoPromociones = this.codigoPromocion.toString()
    requestEditaPromocion.Descripcion = valores['descripcion']
    requestEditaPromocion.Estado = valores['radio']
    requestEditaPromocion.Usuario = 'Admin'
    requestEditaPromocion.Tipo = 'U'
    
    this.promocionService.editapromocion(requestEditaPromocion).subscribe(response=>
    {
      this.promocionResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE')
      this.closeModal()
    }
    )
  }
  
  clear(){
    this.group.reset({radio: 'A'})
  }
}
