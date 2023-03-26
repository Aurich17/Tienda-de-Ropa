import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MatDialogRef } from '@angular/material/dialog';
import { MedidaRepository } from 'src/app/Medida/domain/medida.repository';
import { AlmacenResponse } from 'src/app/Medida/domain/response/medida_response';
import { UtilService } from 'src/app/services/util.service';
import { guardaalmacenrequest } from 'src/app/Medida/domain/request/medida_request';

@Component({
  selector: 'app-reg-medida',
  templateUrl: './reg-medida.component.html',
  styleUrls: ['./reg-medida.component.css']
})
export class RegMedidaComponent implements OnInit {
  select: 'A'|'I' ='A'
  almacenResponse:AlmacenResponse
  group:FormGroup
  almacenAgregar = []
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,Validators.required),
    radio : new   FormControl(null,Validators.required),   
   });
   }

  constructor(private readonly almacenService : MedidaRepository,private readonly  reference: MatDialogRef<RegMedidaComponent>, private readonly util: UtilService) { }
  

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guarda(){
    const valores = this.group.value
    const requestGuardaAlmacen: guardaalmacenrequest =<guardaalmacenrequest>{}
      requestGuardaAlmacen.Descripcion = valores['descripcion']
      requestGuardaAlmacen.Estado = valores['radio']
      requestGuardaAlmacen.Usuario_reg = 'Admin'
      requestGuardaAlmacen.Tipo = 'I'
      
      this.almacenService.guardaalmacen(requestGuardaAlmacen).subscribe(response=>
      {
        this.almacenResponse = response
        this.util.showMessage('GUARDADO CORRECTAMENTE')
        this.closeModal()
      }
      )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }
}
