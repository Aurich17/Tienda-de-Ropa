import { AlmacenResponse } from './../../../domain/response/almacen_response';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegAlmacenComponent } from '../reg-almacen/reg-almacen.component';
import { ListaAlmacen } from '../../../../Almacen/domain/response/almacen_response';
import { MetadataTable } from '../../../../interfaces/metada-table.interface';
import { EditaAlmacenComponent } from '../edita-almacen/edita-almacen.component';
import { almacenrequest } from '../../../../../../src/app/almacen/domain/request/almacen_request';
import { AlmacenRepository } from '../../../../almacen/domain/almacen.repository';
import { UtilService } from './../../../../services/util.service';


//@ts-ignore
@Component({
  selector: 'app-mante-almacen',
  templateUrl: './mante-almacen.component.html',
  styleUrls: ['./mante-almacen.component.css']
})
export class ManteAlmacenComponent implements OnInit {
  labelPosition: 'I'|'A'='A'
  almacen:string
  dataTable: ListaAlmacen[]
  listaAlmacen : ListaAlmacen
  almacenResponse:AlmacenResponse
  group:FormGroup
  dialogConfig = new MatDialogConfig();
 // modalDialog: MatDialogRef<RegAlmacenComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoAlmacen",title: "Cod.Almacen"} ,
    {field:"descripcion", title: "Desc.Almacen"},
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

  constructor(public matDialog: MatDialog, private readonly almacenService : AlmacenRepository, private readonly util: UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
       //       this.modalDialog?.close()
          }
      }
  }


  agregarAlmacen() {

    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "500px";
    this.dialogConfig.disableClose = true
  //  this.modalDialog = this.matDialog.open(RegAlmacenComponent, this.dialogConfig);
  }

  openModal(record : any){
    record =  this.listaAlmacen
   /*//record = this.codigoEmpleado
   //this.cantidadApoyo = 0;

   const options = {

     disableClose: true,
     panelClass:'editaAlmacen',
     data: record,
   };

   const reference =  this.util.openModal(
    EditaAlmacenComponent,
      options,

     );
     reference.subscribe((response) => {
      this.listar()
       if (response){

        // this.cantidadApoyo = response.CantidadApoyo;
        // this.listaEmpleado = response.listaEmpleado
       }
     });*/
 }

 ngOnInit(): void {
  this.initializeForm();
  this.listar();
}

listar (){
  if (this.group.valid){

    const fd= new FormData();
    const values = this.group.value

    const requestAlmacen: almacenrequest =<almacenrequest>{}//  this.group.value;

    requestAlmacen.Descripcion='%'
    requestAlmacen.Estado='A'

      this.almacenService.listar(requestAlmacen).subscribe(response =>

        {
          this.almacenResponse = response
          this.dataTable = this.almacenResponse.datos.result;
        }
          )

}
}
editar(almacen:ListaAlmacen){
  this.listaAlmacen = almacen;
  this.openModal(this.almacen);
}

listarfiltro(){
  // console.log(this.jj)
  if (this.group.valid){

    const fd= new FormData();
    const values = this.group.value

    const requestRoles: almacenrequest =<almacenrequest>{}//  this.group.value;

    requestRoles.Descripcion= values['descripcion']
    requestRoles.Estado= values['radio']

    if(requestRoles.Descripcion === '' || requestRoles.Descripcion == null){
      requestRoles.Descripcion = '%'
    }
      this.almacenService.listarfiltro(requestRoles).subscribe(response =>
        {
          this.almacenResponse = response
          this.dataTable = this.almacenResponse.datos.result;
        }
          )

}}
}
