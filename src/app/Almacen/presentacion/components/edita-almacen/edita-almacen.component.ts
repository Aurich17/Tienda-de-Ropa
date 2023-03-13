import { AlmacenResponse, ListaAlmacen } from './../../../domain/response/almacen_response';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editaalmacenrequest } from 'src/app/almacen/domain/request/almacen_request';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';

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
    desAlmacen : new FormControl (this.data?.descripcion,null),
    radio : new   FormControl(this.data?.estado,null),
    direccion : new FormControl(this.data?.direccion,null),
   });
  }
  constructor(private readonly almacenService : AlmacenRepository, @Inject(MAT_DIALOG_DATA) private data : ListaAlmacen,private readonly  reference: MatDialogRef<EditaAlmacenComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoAlmacen= this.data?.codigoAlmacen
    alert(this.data?.codigoAlmacen)
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
      alert('eDITADO CORRECTAMENTE');
      console.log(requestEditaAlmacen.CodigoAlmacen)
      console.log(requestEditaAlmacen.Descripcion)
      console.log(requestEditaAlmacen.Estado)
      console.log(requestEditaAlmacen.Direccion)
      console.log(requestEditaAlmacen.Tipo)
    }
    
    )
  }  

}
