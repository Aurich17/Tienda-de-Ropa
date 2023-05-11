import { RolService } from './../../../../services/rol.service';
import { ListaRoles, RolResponse } from './../../../domain/response/rol_response';
import { guardarolrequest, rolrequest } from './../../../domain/request/rol_request';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegRolesComponent } from '../reg-roles/reg-roles.component';
import { RolRepository } from 'src/app/roles/domain/rol.repository';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { UtilService } from 'src/app/services/util.service';
import { EditaRolesComponent } from '../edita-roles/edita-roles.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-mante-roles',
  templateUrl: './mante-roles.component.html',
  styleUrls: ['./mante-roles.component.css']
})
export class ManteRolesComponent implements OnInit {
  labelPosition: 'I' | 'A' = 'A';
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataTable :  ListaRoles[]
  rolResponse: RolResponse;
  group:FormGroup;
  roles='roles';
  listaRoles:ListaRoles;
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegRolesComponent, any> | undefined;

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
    radio : new   FormControl(null,null),   
   });
   }

  constructor(public matDialog: MatDialog, private readonly rolService : RolRepository, private readonly util: UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }

  agregaRol() {
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "500px";
    this.dialogConfig.disableClose =true;
    this.modalDialog = this.matDialog.open(RegRolesComponent, this.dialogConfig);
  }


  openModal(record : any){
    record =  this.listaRoles
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;
 
   const options = {
     disableClose: true,
     panelClass:'editaRol',
     data: record,
   };
 
   const reference =  this.util.openModal(
    EditaRolesComponent,
      options,
     
     );
     reference.subscribe((response) => {
      this.listar()
       if (response){
        
        // this.cantidadApoyo = response.CantidadApoyo;
        // this.listaEmpleado = response.listaEmpleado
       }
     });
 }




  ngOnInit(): void {  
    this.initializeForm();
    this.listar();
  }

  listar (){
    if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
    
      const requestRoles: rolrequest =<rolrequest>{}//  this.group.value;
     
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
  editar(roles:ListaRoles){
    this.listaRoles = roles;
    this.openModal(this.roles);
  }

  listarfiltro(){
    // console.log(this.jj)
    if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
    
      const requestRoles: rolrequest =<rolrequest>{}//  this.group.value;
     
      requestRoles.Descripcion= values['descripcion']
      requestRoles.Estado= values['radio']

      if(requestRoles.Descripcion === '' || requestRoles.Descripcion == null){
        requestRoles.Descripcion = '%'
      }
        this.rolService.listarfiltro(requestRoles).subscribe(response => 
          {
            this.rolResponse = response
            this.dataTable = this.rolResponse.datos.result;
          }
            )

  }}

}


