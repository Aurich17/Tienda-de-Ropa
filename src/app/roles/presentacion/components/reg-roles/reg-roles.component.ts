import { ManteRolesComponent} from './../mante-roles/mante-roles.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  guardarolrequest} from 'src/app/roles/domain/request/rol_request';
import { ListaRoles, RolResponse } from 'src/app/roles/domain/response/rol_response';
import { RolRepository } from 'src/app/roles/domain/rol.repository';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-reg-roles',
  templateUrl: './reg-roles.component.html',
  styleUrls: ['./reg-roles.component.css']
})

export class RegRolesComponent implements OnInit {
  select: 'A'|'I' = 'A'
  rolResponse: RolResponse;
  codigoRol:number;
  mygroup:FormGroup;
  initializeForm(){
    this.mygroup = new FormGroup({
    descripcion : new FormControl (null,Validators.required),
    radio : new   FormControl(null,null),   
   });
   }

  constructor(private readonly rolService : RolRepository, @Inject(MAT_DIALOG_DATA) private data : ListaRoles,private readonly  reference: MatDialogRef<RegRolesComponent>, private readonly util: UtilService){ }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoRol= this.data?.codigoRol
  }
  closeModal() {
    this.reference.close();
  }
  
  guardarol(){
    const valores = this.mygroup.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaRol: guardarolrequest =<guardarolrequest>{}
    
    requestGuardaRol.Descripcion = valores['descripcion']
    requestGuardaRol.Estado = valores['radio']
    requestGuardaRol.Usuario = 'Admin'
    requestGuardaRol.Tipo = 'I'
    
    this.rolService.guardarol(requestGuardaRol).subscribe(response=>
    {
      this.rolResponse = response
      this.util.showMessage('GUARDADO CORRECTAMENTE');
      this.closeModal()
    }
    )
  }
  clear() {
    console.log(this.mygroup.reset({radio: 'A'}))
  }
}
