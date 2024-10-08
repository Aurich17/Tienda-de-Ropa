import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { MedidaResponse, ListaMedida } from 'src/app/Medida/domain/response/medida_response';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { MedidaRepository } from 'src/app/Medida/domain/medida.repository';
import { UtilService } from 'src/app/services/util.service';

import { Medidarequest } from 'src/app/Medida/domain/request/medida_request';
//import { RegMedidaComponent } from '../reg-medida/reg-medida.component';



@Component({
  selector: 'app-mante-medida',
  templateUrl: './mante-medida.component.html',
  styleUrls: ['./mante-medida.component.css']
})
export class ManteMedidaComponent implements OnInit {
  labelPosition: 'I'|'A'='A'
  public page:number
  almacen:string
  dataTable: ListaMedida[]
  listaAlmacen : ListaMedida
  almacenResponse:MedidaResponse
  group:FormGroup
  dialogConfig = new MatDialogConfig();
  //modalDialog: MatDialogRef<RegMedidaComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoUnidadMedida",title: "Cod.UnidadMedida"} ,
    {field:"descripcion", title: "Desc.Medida"},
    {field:"estado", title: "Estado"},
    {field:"usuario_reg", title: "Usu.Reg"},
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

  constructor(public matDialog: MatDialog, private readonly MedidaService : MedidaRepository, private readonly util: UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
        //      this.modalDialog?.close()
          }
      }
  }
  

  agregar() {
    
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "500px";
    this.dialogConfig.disableClose = true
   // this.modalDialog = this.matDialog.open(RegMedidaComponent, this.dialogConfig);
  }

 /* openModal(record : any){
    record =  this.listaAlmacen
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;
 
   const options = {
        
     disableClose: true,
     panelClass:'editaMedida',
     data: record,
   };
 
   const reference =  this.util.openModal(
    EditaMedidaComponent,
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
 */

 ngOnInit(): void {  
  this.initializeForm();
  this.listar();
}

listar (){
  if (this.group.valid){
   
    const fd= new FormData();
    const values = this.group.value
  
    const requestAlmacen: Medidarequest =<Medidarequest>{}//  this.group.value;
   
    requestAlmacen.Descripcion='%'
    requestAlmacen.Estado='A'

      this.MedidaService.listar(requestAlmacen).subscribe(response => 

        {
          this.almacenResponse = response
          this.dataTable = this.almacenResponse.datos.result;
        }
          )

}
}
editar(almacen:ListaMedida){
  this.listaAlmacen = almacen;
  //this.openModal(this.almacen);
}

listarfiltro(){
  // console.log(this.jj)
  if (this.group.valid){
   
    const fd= new FormData();
    const values = this.group.value
  
    const requestRoles: Medidarequest =<Medidarequest>{}//  this.group.value;
   
    requestRoles.Descripcion= values['descripcion']
    requestRoles.Estado= values['radio']

    if(requestRoles.Descripcion === '' || requestRoles.Descripcion == null){
      requestRoles.Descripcion = '%'
    }
      this.MedidaService.listarfiltro(requestRoles).subscribe(response => 
        {
          this.almacenResponse = response
          this.dataTable = this.almacenResponse.datos.result;
        }
          )

}}
}
