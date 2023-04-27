import {TiendaResponse, ListaTienda } from './../../../domain/response/tienda_response';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editatiendarequest } from 'src/app/tienda/domain/request/tienda_request';
import { TiendaRepository } from 'src/app/tienda/domain/tienda.repository';
import { UtilService } from 'src/app/services/util.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-edita-tienda',
  templateUrl: './edita-tienda.component.html',
  styleUrls: ['./edita-tienda.component.css']
})
export class EditaTiendaComponent implements OnInit {
  group:FormGroup
  codigoTienda:number
  tiendaResponse:TiendaResponse
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (this.data?.descripcion,Validators.required),
    radio : new   FormControl(this.data?.estado,Validators.required),
    direccion : new FormControl(this.data?.direccion,Validators.required),
   });
  }
  constructor(private readonly tiendaService : TiendaRepository, @Inject(MAT_DIALOG_DATA) private data : ListaTienda,private readonly  reference: MatDialogRef<EditaTiendaComponent>,  private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoTienda= this.data?.codigoTienda
  }

  closeModal() {
    this.reference.close();
  }

  editaTienda(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaTienda: editatiendarequest =<editatiendarequest>{}
    
    requestEditaTienda.CodigoTienda = this.codigoTienda.toString()
    requestEditaTienda.Descripcion = valores['descripcion']
    requestEditaTienda.Direccion = valores['direccion']
    requestEditaTienda.Estado = valores['radio']
    requestEditaTienda.Usuario_reg = 'Admin'
    requestEditaTienda.Direccion = valores['direccion']
    requestEditaTienda.Tipo = 'U'
    
    this.tiendaService.editatienda(requestEditaTienda).subscribe(response=>
    {
      this.tiendaResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE')
      this.closeModal()
    }
    
    )
  }
  clear(){
    this.group.reset({radio: 'A'})
  }  
}
