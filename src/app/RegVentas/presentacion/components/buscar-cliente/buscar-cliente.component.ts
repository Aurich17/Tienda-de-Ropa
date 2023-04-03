import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { ClienteRepository } from 'src/app/RegVentas/domain/cliente.repository';
import { clienterequest } from 'src/app/RegVentas/domain/request/cliente_request';
import { ClienteResponse, ListaCliente } from 'src/app/RegVentas/domain/response/cliente_response';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { RegVentasComponent } from '../reg-ventas/reg-ventas.component';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {

  groupCliente:FormGroup
  select: 'false'|'true'='false';
  clienteSeleccionado: any;
  dataTable: ListaCliente[]
  clienteResponse: ClienteResponse;

  metadataTable: MetadataTable[] = [
    {field:"nombres", title: "Nombres"},
    {field:"numerodocumento", title: "Nro.Documento"},
    {field:"direccion",title:"Direccion"},
  ];
  
  initializeForm(){
  this.groupCliente = new FormGroup({
      nombre : new FormControl(null, null),
      listMenu : new FormControl(null, null),
      nroDoc: new FormControl(null,null),
    })
  }

  constructor(public matDialog: MatDialog,private router: Router,  private readonly productoService : ClienteRepository, private readonly clienteService : ClienteRepository,private readonly  reference: MatDialogRef<BuscarClienteComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
    this.listarCliente()
  }

  closeModal() {
    this.reference.close();
  }
  
  seleccionarFila(cliente: any) {
    this.clienteSeleccionado = cliente;
  }

  
listarCliente(){
  // console.log(this.jj)
  if (this.groupCliente.valid){
   
    //const fd= new FormData();
    const values = this.groupCliente.value
  
    const requestCliente: clienterequest =<clienterequest>{}//  this.group.value;
   
    requestCliente.CodigoCliente = '0'
    requestCliente.tipoCliente = '%'
    requestCliente.nombres= values['nombre']
    requestCliente.apellidopaterno = '%'
    requestCliente.apellidomaterno = '%'
    requestCliente.c_razonsocial = '%'
    requestCliente.tipodocumento = '%'
    requestCliente.numerodocumento = values['nroDoc']
    requestCliente.departamento = ''
    requestCliente.provincia = ''
    requestCliente.distrito = ''
    requestCliente.estado= ''

    if(requestCliente.nombres === '' || requestCliente.nombres == null){
      requestCliente.nombres = '%'
    }
    if(requestCliente.numerodocumento === '' || requestCliente.numerodocumento == null){
      requestCliente.numerodocumento = '%'
    }
    this.clienteService.listarcliente(requestCliente).subscribe(
      response => {
        this.clienteResponse = response;
        this.dataTable = this.clienteResponse.datos.result;
      },
      error => {
        console.log(error);
      }
    );
}
}

}
