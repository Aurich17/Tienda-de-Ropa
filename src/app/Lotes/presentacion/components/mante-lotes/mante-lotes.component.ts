import { LoteResponse } from '../../../../Lotes/domain/response/lote_response';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegLotesComponent } from '../reg-lotes/reg-lotes.component';
import { ListaLote } from '../../../../Lotes/domain/response/lote_response';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { EditaLotesComponent } from '../edita-lotes/edita-lotes.component';
import { loterequest } from 'src/app/Lotes/domain/request/lote_request';
import { LoteRepository } from 'src/app/Lotes/domain/lote.repository';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-mante-lotes',
  templateUrl: './mante-lotes.component.html',
  styleUrls: ['./mante-lotes.component.css']
})
export class ManteLotesComponent implements OnInit {
  labelPosition: 'I'|'A' = 'A'
  lote:string
  dataTable: ListaLote[]
  listaLote:ListaLote
  loteResponse:LoteResponse
  group:FormGroup
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegLotesComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoLote",title: "Cod.Lote"} ,
    {field:"descripcion", title: "Desc.Lote"},
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

  constructor(public matDialog: MatDialog, private readonly loteService : LoteRepository, private readonly util: UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }

  agregaLote() {

    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "500px";
    this.dialogConfig.disableClose = true;
    this.modalDialog = this.matDialog.open(RegLotesComponent, this.dialogConfig);
  }

  openModal(record : any){
    record =  this.listaLote
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;

   const options = {

     disableClose: true,
     panelClass:'editaLote',
     data: record,
   };

   const reference =  this.util.openModal(
    EditaLotesComponent,
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

    const requestLote: loterequest =<loterequest>{}//  this.group.value;

    requestLote.Descripcion='%'
    requestLote.Estado='A'

      this.loteService.listar(requestLote).subscribe(response =>

        {
          this.loteResponse = response
          this.dataTable = this.loteResponse.datos.result;
        }
          )

}
}
editar(lote:ListaLote){
  this.listaLote = lote;
  this.openModal(this.lote);
}

listarfiltro(){
  // console.log(this.jj)
  if (this.group.valid){

    const fd= new FormData();
    const values = this.group.value

    const requestLote: loterequest =<loterequest>{}//  this.group.value;

    requestLote.Descripcion= values['descripcion']
    requestLote.Estado= values['radio']

    if(requestLote.Descripcion === '' || requestLote.Descripcion == null){
      requestLote.Descripcion = '%'
    }
      this.loteService.listarfiltro(requestLote).subscribe(response =>
        {
          this.loteResponse = response
          this.dataTable = this.loteResponse.datos.result;
        }
          )

}}
}
