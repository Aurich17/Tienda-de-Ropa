import { PromocionResponse, ListaPromocion } from './../../../domain/response/promociones_response';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editapromocionrequest } from 'src/app/Promociones/domain/request/promociones_request';
import { PromocionRepository } from 'src/app/Promociones/domain/promociones.repository';
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
    descripcion : new FormControl (this.data?.descripcion,null),
    radio : new   FormControl(this.data?.estado,null),
   });
  }

  constructor(private readonly promocionService : PromocionRepository, @Inject(MAT_DIALOG_DATA) private data : ListaPromocion,private readonly  reference: MatDialogRef<EditaPromocionesComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoPromocion= this.data?.codigoPromocion
    alert(this.data?.codigoPromocion)
  }

  closeModal() {
    this.reference.close();
  }

  editaPromocion(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaPromocion: editapromocionrequest =<editapromocionrequest>{}
    
    requestEditaPromocion.CodigoPromocion = this.codigoPromocion.toString()
    requestEditaPromocion.Descripcion = valores['descripcion']
    requestEditaPromocion.Estado = valores['radio']
    requestEditaPromocion.Usuario = 'Admin'
    requestEditaPromocion.Tipo = 'U'
    
    this.promocionService.editapromocion(requestEditaPromocion).subscribe(response=>
    {
      this.promocionResponse = response
      alert('eDITADO CORRECTAMENTE');
    }
    
    )
  }  

}
