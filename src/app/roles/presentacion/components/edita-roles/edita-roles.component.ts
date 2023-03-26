import { ManteRolesComponent} from './../mante-roles/mante-roles.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editarolrequest, guardarolrequest, rolrequest } from 'src/app/roles/domain/request/rol_request';
import { ListaRoles, RolResponse } from 'src/app/roles/domain/response/rol_response';
import { RolRepository } from 'src/app/roles/domain/rol.repository';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-edita-roles',
  templateUrl: './edita-roles.component.html',
  styleUrls: ['./edita-roles.component.css']
})
export class EditaRolesComponent implements OnInit {

  value = true;
  rolResponse: RolResponse;
  codigoRol:number;
  mygroup:FormGroup;
  initializeForm(){
    this.mygroup = new FormGroup({
    descripcion : new FormControl (this.data?.descripcion,Validators.required),
    radio : new   FormControl(this.data?.estado,null),   
   });
   }

  constructor(private readonly rolService : RolRepository, @Inject(MAT_DIALOG_DATA) private data : ListaRoles,private readonly  reference: MatDialogRef<EditaRolesComponent>, private readonly util: UtilService){ }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoRol= this.data?.codigoRol
  }
  closeModal() {
    this.reference.close();
  }
  
  editarol(){
    const valores = this.mygroup.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaRol: editarolrequest =<editarolrequest>{}
    
    requestEditaRol.CodigoRol = this.codigoRol.toString()
    requestEditaRol.Descripcion = valores['descripcion']
    requestEditaRol.Estado = valores['radio']
    requestEditaRol.Usuario = 'Admin'
    requestEditaRol.Tipo = 'U'

    this.rolService.editarol(requestEditaRol).subscribe(response=>
    {
      this.rolResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE')
      this.closeModal()
    }
    )
  }
  clear(){
    this.mygroup.reset({radio: 'A'})
  }    
}
