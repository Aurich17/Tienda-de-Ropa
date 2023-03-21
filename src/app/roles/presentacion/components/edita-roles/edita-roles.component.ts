import { ManteRolesComponent} from './../mante-roles/mante-roles.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editarolrequest, guardarolrequest, rolrequest } from 'src/app/roles/domain/request/rol_request';
import { ListaRoles, RolResponse } from 'src/app/roles/domain/response/rol_response';
import { RolRepository } from 'src/app/roles/domain/rol.repository';
@Component({
  selector: 'app-edita-roles',
  templateUrl: './edita-roles.component.html',
  styleUrls: ['./edita-roles.component.css']
})
export class EditaRolesComponent implements OnInit {

  value = true;
  nombre = 'REGISTRO ROL';
  rolResponse: RolResponse;
  usuario ='usuario';
  rol = 'rol';
  menu = 'menu';
  codigoRol:number;
  mygroup:FormGroup;
  initializeForm(){
    this.mygroup = new FormGroup({
    descripcion : new FormControl (this.data?.descripcion,null),
    radio : new   FormControl(this.data?.estado,null),   
   });
   alert(this.data?.descripcion.toString());
   }

  constructor(private readonly rolService : RolRepository, @Inject(MAT_DIALOG_DATA) private data : ListaRoles,private readonly  reference: MatDialogRef<EditaRolesComponent>){ }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoRol= this.data?.codigoRol
  }
  closeModal() {
    this.reference.close();
  }
  
  editarol(){
    alert('EDITA ROL');
    const valores = this.mygroup.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaRol: editarolrequest =<editarolrequest>{}
    
    requestEditaRol.CodigoRol = this.codigoRol.toString()
    requestEditaRol.Descripcion = valores['descripcion']
    requestEditaRol.Estado = valores['radio']
    requestEditaRol.Usuario = 'Admin'
    requestEditaRol.Tipo = 'U'
    

    console.log(requestEditaRol.CodigoRol)
    console.log(requestEditaRol.Descripcion)
    console.log(requestEditaRol.Estado)
    console.log(requestEditaRol.Tipo)

    this.rolService.editarol(requestEditaRol).subscribe(response=>
    {
      this.rolResponse = response
    }
    )
  }  
}
