import { PromocionResponse } from './../../../domain/response/promociones_response';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegPromocionesComponent } from '../reg-promociones/reg-promociones.component';
import { ListaPromocion } from 'src/app/Promociones/domain/response/promociones_response';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { EditaPromocionesComponent } from '../edita-promociones/edita-promociones.component';
import { promocionrequest } from 'src/app/Promociones/domain/request/promociones_request';
import { PromocionRepository } from 'src/app/Promociones/domain/promociones.repository';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-mante-promociones',
  templateUrl: './mante-promociones.component.html',
  styleUrls: ['./mante-promociones.component.css']
})
export class MantePromocionesComponent implements OnInit {
  group:FormGroup
  dataTable:ListaPromocion[]
  listaPromocion:ListaPromocion
  promocionResponse:PromocionResponse
  promocion:string
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegPromocionesComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoPromocion",title: "Cod.Promocion"} ,
    {field:"descripcion", title: "Desc.Promocion"},
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


  constructor(public matDialog: MatDialog, private readonly promocionService : PromocionRepository, private readonly util: UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }

  agregarPromocion() {
    
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "800px";
    this.dialogConfig.width = "700px";
    this.dialogConfig.disableClose = true
    this.modalDialog = this.matDialog.open(RegPromocionesComponent, this.dialogConfig);
  }

  openModal(record : any){
    record =  this.listaPromocion
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;
 
   const options = {
        
     disableClose: true,
     panelClass:'container-form',
     data: record,
   };
 
   const reference =  this.util.openModal(
    EditaPromocionesComponent,
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
  
    const requestPromocion: promocionrequest =<promocionrequest>{}//  this.group.value;
   
    requestPromocion.Descripcion='%'
    requestPromocion.Estado='A'

      this.promocionService.listar(requestPromocion).subscribe(response => 

        {
          this.promocionResponse = response
          this.dataTable = this.promocionResponse.datos.result;
        }
          )

}
}
editar(lote:ListaPromocion){
  this.listaPromocion = lote;
  this.openModal(this.promocion);
}

listarfiltro(){
  // console.log(this.jj)
  if (this.group.valid){
   
    const fd= new FormData();
    const values = this.group.value
  
    const requestPromocion: promocionrequest =<promocionrequest>{}//  this.group.value;
   
    requestPromocion.Descripcion= values['descripcion']
    requestPromocion.Estado= values['radio']

    if(requestPromocion.Descripcion === '' || requestPromocion.Descripcion == null){
      requestPromocion.Descripcion = '%'
    }
      this.promocionService.listarfiltro(requestPromocion).subscribe(response => 
        {
          this.promocionResponse = response
          this.dataTable = this.promocionResponse.datos.result;
        }
          )

}}
}
