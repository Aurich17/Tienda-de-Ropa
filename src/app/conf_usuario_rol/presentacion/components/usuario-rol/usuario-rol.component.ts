import { ListaRoles, RolUsuarioResponse } from './../../../domain/response/rol_usuario_response';
import { rolusuariorequest } from './../../../domain/request/rol_usuario_request';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegUsuarioRolComponent } from '../reg-usuario-rol/reg-usuario-rol.component';
import { RolRepository } from 'src/app/roles/domain/rol.repository';
import { ActividadResponse } from 'src/app/aperturaparte/domain/parte-respuesta';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.css']
})
export class UsuarioRolComponent implements OnInit {

  dataTable :  ListaRoles[]
  rolResponse: RolUsuarioResponse;
  group:FormGroup;
  usuario='usuario';
  roles='roles';
  menu='menu';
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegUsuarioRolComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoRol",title: "Cod.Rol"} ,
    {field:"descripcion", title: "Desc.Rol"},
    {field:"estado", title: "Estado"},
    {field:"usuarioReg", title: "Usu.Reg"},
    {field:"fecha_hora_reg", title: "Fecha Hora Registro"},
    {field:"usuario_mod", title: "Usu.Mod"},
    {field:"fecha_hora_mod", title: "Fecha Hora Mod"},            
  ];

  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,null),
    seleccion: new FormControl(null,null),
    listMenu: new FormControl(null,null),
    radio : new   FormControl(null,null),   
   });
   }

  constructor(public matDialog: MatDialog, private readonly rolService : RolRepository) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }

  openModal() {
    
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "800px";
    this.dialogConfig.width = "700px";
    this.modalDialog = this.matDialog.open(RegUsuarioRolComponent, this.dialogConfig);
  }

  ngOnInit(): void {  
    this.initializeForm();
    this.listar();
  }

  listar (){


    if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
    
      const requestRoles: rolusuariorequest =<rolusuariorequest>{}//  this.group.value;
     
      requestRoles.Descripcion='%'
      requestRoles.Estado='A'

        this.rolService.listar(requestRoles).subscribe(response => 
  
          {
            this.rolResponse = response
            this.dataTable = this.rolResponse.datos.result;
          }
            )

  }
  }
}
