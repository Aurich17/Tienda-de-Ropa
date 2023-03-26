import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import {  PromocionResponse } from 'src/app/Promociones/domain/response/promociones_response';
import { PromocionRepository } from 'src/app/Promociones/domain/promociones.repository';
import { guardapromocionrequest } from 'src/app/Promociones/domain/request/promociones_request';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-reg-promociones',
  templateUrl: './reg-promociones.component.html',
  styleUrls: ['./reg-promociones.component.css']
})
export class RegPromocionesComponent implements OnInit {
  select: 'A'|'I' = 'A'
  promocionAgregar =[];
  promocionResponse:PromocionResponse
  group:FormGroup;
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,Validators.required),
    radio : new   FormControl(null,Validators.required),   
   });
   }
  constructor(private readonly  promocionService : PromocionRepository,private readonly  reference: MatDialogRef<RegPromocionesComponent>, private readonly util: UtilService) { }
  

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardaPromocion(){
    const requestGuardaPromocion: guardapromocionrequest =<guardapromocionrequest>{}
    const valores = this.group.value
    
      requestGuardaPromocion.Descripcion = valores['descripcion']
      requestGuardaPromocion.Estado = valores['radio']
      requestGuardaPromocion.Usuario = 'Admin'
      requestGuardaPromocion.Tipo = 'I'
      
      this.promocionService.guardapromocion(requestGuardaPromocion).subscribe(response=>
      {
        this.promocionResponse = response
        this.util.showMessage('GUARDADO CORRECTAMENTE')
        this.closeModal()
      }
      )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }
}
