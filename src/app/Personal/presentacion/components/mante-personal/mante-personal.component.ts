import { ListaPersonal, PersonalResponse } from './../../../domain/response/personal_response';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegPersonalComponent } from '../reg-personal/reg-personal.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { PersonalRepository } from 'src/app/personal/domain/personal.repository';
import { UtilService } from 'src/app/services/util.service';
import { EditaPersonalComponent } from '../edita-personal/edita-personal.component';
import { personalrequest } from 'src/app/personal/domain/request/personal_request';


@Component({
  selector: 'app-mante-personal',
  templateUrl: './mante-personal.component.html',
  styleUrls: ['./mante-personal.component.css']
})
export class MantePersonalComponent implements OnInit {
  labelPosition: 'I'|'A' ='A'
  group:FormGroup
  dataTable : ListaPersonal[]
  listaPersonal : ListaPersonal
  personalResponse:PersonalResponse
  personal :string


  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegPersonalComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoPersonal",title: "Cod.Personal"} ,
    {field:"nombres", title: "Nombres"},
    {field:"apellidos",title:"Apellidos"},
    {field:"dni",title:"DNI"},
    {field:"telefono", title:"Telefono"},
    {field:"sueldo",title:"Sueldo"},
    {field:"direccion", title:"Direccion"},
    {field:"estado", title: "Estado"},
    {field:"fecha_hora_reg", title: "Fecha Hora Registro"},
    {field:"usuario_mod", title: "Usu.Mod"},
    {field:"fecha_hora_mod", title: "Fecha Hora Mod"},     
  ];
  initializeForm(){
    this.group = new FormGroup({
    nombre : new FormControl (null,null),
    dni : new   FormControl(null,null),
    apellido : new FormControl(null,null),
    radio: new FormControl(null,null),   
   });
   }

  constructor(public matDialog: MatDialog, private readonly personalService : PersonalRepository, private readonly util: UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }

  agregarPersonal() {
    
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "620px";
    this.dialogConfig.width = "650px";
    this.dialogConfig.disableClose =true;
    this.modalDialog = this.matDialog.open(RegPersonalComponent, this.dialogConfig);
  }

  openModal(record : any){
    record =  this.listaPersonal
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;
 
   const options = {
        
     disableClose: true,
     panelClass:'editaPersonal',
     data: record,
   };
 
   const reference =  this.util.openModal(
    EditaPersonalComponent,
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
  
    const requestPersonal: personalrequest =<personalrequest>{}//  this.group.value;
   
    requestPersonal.Nombres='%'
    requestPersonal.Apellidos='%'
    requestPersonal.Dni = '%'
    requestPersonal.Estado = 'A'

      this.personalService.listar(requestPersonal).subscribe(response => 

        {
          this.personalResponse = response
          this.dataTable = this.personalResponse.datos.result;
        }
          )

}
}
editar(personal:ListaPersonal){
  this.listaPersonal = personal;
  this.openModal(this.personal);
}

listarfiltro(){
  // console.log(this.jj)
  if (this.group.valid){
   
    const fd= new FormData();
    const values = this.group.value
  
    const requestPersonal: personalrequest =<personalrequest>{}//  this.group.value;
   
    requestPersonal.Nombres= values['nombre']
    requestPersonal.Apellidos = values['apellido']
    requestPersonal.Dni = values['dni']
    requestPersonal.Estado= values['radio']

    if(requestPersonal.Nombres === '' || requestPersonal.Nombres == null){
      requestPersonal.Nombres = '%'
    }
    if(requestPersonal.Apellidos === '' || requestPersonal.Apellidos == null){
      requestPersonal.Apellidos = '%'
    }
    if(requestPersonal.Dni === '' || requestPersonal.Dni == null){
      requestPersonal.Dni = '%'
    }
      this.personalService.listarfiltro(requestPersonal).subscribe(response => 
        {
          this.personalResponse = response
          this.dataTable = this.personalResponse.datos.result;
        }
          )

}}
}
