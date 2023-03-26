import { TiendaResponse} from './../../../domain/response/tienda_response';
import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {guardatiendarequest } from 'src/app/Tienda/domain/request/tienda_request';
import {TiendaRepository } from 'src/app/Tienda/domain/tienda.repository';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-reg-tienda',
  templateUrl: './reg-tienda.component.html',
  styleUrls: ['./reg-tienda.component.css']
})
export class RegTiendaComponent implements OnInit {
  select: 'A'|'I' ='A'
  group:FormGroup
  tiendaResponse : TiendaResponse
  tienda:string

  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,Validators.required),
    direccion : new FormControl (null, Validators.required),
    radio : new   FormControl(null,Validators.required),
   });
   }

  constructor(private readonly tiendaService : TiendaRepository,private readonly  reference: MatDialogRef<RegTiendaComponent>,  private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }

  guardatienda(){
    //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaTienda: guardatiendarequest =<guardatiendarequest>{}
    const valores = this.group.value

      requestGuardaTienda.Descripcion = valores['descripcion']
      requestGuardaTienda.Direccion = valores['direccion']
      requestGuardaTienda.Estado = valores['radio']
      requestGuardaTienda.Usuario_reg = 'Admin'
      requestGuardaTienda.Tipo = 'I'
      
      this.tiendaService.guardatienda(requestGuardaTienda).subscribe(response=>
      {
        this.tiendaResponse = response
        this.util.showMessage('GUARDADO CORRECTAMENTE')
        this.closeModal()
      }
      )
  }
  SendDataonChange(event: any) {
    console.log(event.target.value);
    }
  clear(){
    this.group.reset({radio: 'A'})
  }
}
