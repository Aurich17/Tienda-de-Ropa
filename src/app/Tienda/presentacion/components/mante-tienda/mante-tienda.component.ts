
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';

import { ListaTienda, TiendaResponse } from '../../../../Tienda/domain/response/tienda_response';

import { tiendarequest } from '../../../../Tienda/domain/request/tienda_request';
import { TiendaRepository } from '../../../../Tienda/domain/tienda.repository';
import { UtilService } from '../../../../services/util.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { RegTiendaComponent } from '../../../../tienda/presentacion/components/reg-tienda/reg-tienda.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { EditaTiendaComponent } from '../../../../tienda/presentacion/components/edita-tienda/edita-tienda.component';


//@ts-ignore
@Component({
  selector: 'app-mante-tienda',
  templateUrl: './mante-tienda.component.html',
  styleUrls: ['./mante-tienda.component.css']
})
export class ManteTiendaComponent implements OnInit {
  labelPosition: 'I'|'A' ='A'

  tienda:string
  dataTable: ListaTienda[]
  listaTienda : ListaTienda
  tiendaResponse:TiendaResponse
  group:FormGroup
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegTiendaComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoTienda",title: "Cod.Tienda"} ,
    {field:"descripcion", title: "Desc.Tienda"},
    {field:"direccion", title: "Direccion"},
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

  constructor(public matDialog: MatDialog, private readonly tiendaService : TiendaRepository, private readonly util: UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }


  agregarTienda() {

    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "500px";
    this.dialogConfig.disableClose = true
    this.modalDialog = this.matDialog.open(RegTiendaComponent, this.dialogConfig);
  }

  openModal(record : any){
    record =  this.listaTienda
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;

   const options = {

     disableClose: true,
     panelClass:'editaTienda',
     data: record,
   };

   const reference =  this.util.openModal(
    EditaTiendaComponent,
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

    const requestTienda: tiendarequest =<tiendarequest>{}//  this.group.value;

    requestTienda.Descripcion='%'
    requestTienda.Estado='A'

      this.tiendaService.listar(requestTienda).subscribe(response =>

        {
          this.tiendaResponse = response
          this.dataTable = this.tiendaResponse.datos.result;
        }
          )

}
}
editar(tienda:ListaTienda){
  this.listaTienda = tienda;
  this.openModal(this.tienda);
}

listarfiltro(){
  // console.log(this.jj)
  if (this.group.valid){

    const fd= new FormData();
    const values = this.group.value

    const requestTienda: tiendarequest =<tiendarequest>{}//  this.group.value;

    requestTienda.Descripcion= values['descripcion']
    requestTienda.Estado= values['radio']

    if(requestTienda.Descripcion === '' || requestTienda.Descripcion == null){
      requestTienda.Descripcion = '%'
    }
      this.tiendaService.listarfiltro(requestTienda).subscribe(response =>
        {
          this.tiendaResponse = response
          this.dataTable = this.tiendaResponse.datos.result;
        }
          )

}}
}
