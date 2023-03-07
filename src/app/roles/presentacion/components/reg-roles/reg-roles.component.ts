import { ManteRolesComponent} from './../mante-roles/mante-roles.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  guardarolrequest} from 'src/app/roles/domain/request/rol_request';
import { ListaRoles, RolResponse } from 'src/app/roles/domain/response/rol_response';
import { RolRepository } from 'src/app/roles/domain/rol.repository';
@Component({
  selector: 'app-reg-roles',
  templateUrl: './reg-roles.component.html',
  styleUrls: ['./reg-roles.component.css']
})

export class RegRolesComponent implements OnInit {
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
   }

  constructor(private readonly rolService : RolRepository, @Inject(MAT_DIALOG_DATA) private data : ListaRoles,private readonly  reference: MatDialogRef<RegRolesComponent>){ }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoRol= this.data?.codigoRol
  }
  closeModal() {
    this.reference.close();
  }
  
  guardarol(){
    alert('GUARDA ROL');
    const valores = this.mygroup.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaRol: guardarolrequest =<guardarolrequest>{}
    
    requestGuardaRol.Descripcion = valores['descripcion']
    requestGuardaRol.Estado = valores['radio']
    requestGuardaRol.Usuario = 'Admin'
    requestGuardaRol.Tipo = 'I'
    
    this.rolService.guardarol(requestGuardaRol).subscribe(response=>
    {
      this.rolResponse = response
    }
    )
  }
}
