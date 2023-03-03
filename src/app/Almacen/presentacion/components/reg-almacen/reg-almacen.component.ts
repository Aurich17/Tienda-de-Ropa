import { AlmacenResponse, ListaAlmacen } from './../../../domain/response/almacen_response';
import { ManteAlmacenComponent} from './../mante-almacen/mante-almacen.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editaalmacenrequest, guardaalmacenrequest, almacenrequest } from 'src/app/almacen/domain/request/almacen_request';
import { ListaRoles, RolResponse } from 'src/app/roles/domain/response/rol_response';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';

@Component({
  selector: 'app-reg-almacen',
  templateUrl: './reg-almacen.component.html',
  styleUrls: ['./reg-almacen.component.css']
})
export class RegAlmacenComponent implements OnInit {
  almacenResponse:AlmacenResponse
  codigoAlmacen:number
  group:FormGroup
  subMenu = 'subMenu'

  mygroup:FormGroup;
  initializeForm(){
    this.group = new FormGroup({
    desAlmacen : new FormControl (null,null),
    dirAlmacen : new FormControl (null, null),
    radio : new   FormControl(null,null),   
   });
   }

  constructor(private readonly almacenService : AlmacenRepository, @Inject(MAT_DIALOG_DATA) private data : ListaAlmacen,private readonly  reference: MatDialogRef<RegAlmacenComponent>) { }
  

  ngOnInit(): void {
    this.initializeForm();
    this.codigoAlmacen= this.data?.codigoAlmacen
  }
  closeModal() {
    this.reference.close();
  }

  guardaalmacen(){
    alert('GUARDA ROL');
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaAlmacen: guardaalmacenrequest =<guardaalmacenrequest>{}
    
    requestGuardaAlmacen.Descripcion = valores['desAlmacen']
    requestGuardaAlmacen.Estado = valores['radio']
    requestGuardaAlmacen.Direccion = valores['dirAlmacen']
    requestGuardaAlmacen.Usuario_reg = 'Admin'
    requestGuardaAlmacen.Tipo = 'I'

    console.log(requestGuardaAlmacen.Descripcion);
    console.log(requestGuardaAlmacen.Estado);
    console.log(requestGuardaAlmacen.Direccion);
    
    
    console.log('ANTES DE ENTRAR AL SUSCRIBE');
    this.almacenService.guardaalmacen(requestGuardaAlmacen).subscribe(response=>
    {
      console.log('Entra en SUSCRIBE')
      this.almacenResponse = response
      alert('GUARDADO CON EXITO')
    }
    )
  }
}
