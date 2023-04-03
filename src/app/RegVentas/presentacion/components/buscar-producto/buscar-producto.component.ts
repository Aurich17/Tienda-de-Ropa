import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ListaProducto, ProductoResponse } from 'src/app/RegVentas/domain/response/cliente_response';
import { ClienteRepository } from 'src/app/RegVentas/domain/cliente.repository';
import { StorageService } from 'src/app/services/storage.service';
import { productorequest } from 'src/app/RegVentas/domain/request/cliente_request';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})

export class BuscarProductoComponent implements OnInit {
  
  groupProducto:FormGroup
  select: 'false'|'true'='false';
  productoResponse:ProductoResponse
  productos: ListaProducto[] = [];
  listaProducto : ListaProducto
  dataTable: ListaProducto[]

  metadataTable: MetadataTable[] = [
    {field:"descripcion", title: "Descripicion"},
    {field:"precioUnitario", title: "Precio"},
    {field:"genero",title:"Genero"},
  ];
  
  initializeForm(){
  this.groupProducto = new FormGroup({
      desMenu : new FormControl(null, null),
      codigo : new FormControl(null, null),
    })
  }

  constructor(private readonly  reference: MatDialogRef<BuscarProductoComponent>,  private readonly productoService : ClienteRepository,private readonly storage :StorageService,) { }

  ngOnInit(): void {
    this.initializeForm();
    this.listarProducto();
  }

  closeModal() {
    this.reference.close();
  }

  
  listarProducto(){
    if (this.groupProducto.valid){
     
      const values = this.groupProducto.value
    
      const requestProducto: productorequest =<productorequest>{}//  this.group.value;
      requestProducto.CodigoEmpresa = this.storage.get("codcompania").toString()
      requestProducto.CodigoProducto = values['codigo']
      requestProducto.Descripcion= values['desMenu']
      requestProducto.Color = '%'
      requestProducto.Talla = '%'
      requestProducto.Tipo_Prenda = 0
      requestProducto.Genero = '%'
      requestProducto.Estado= 'A'
  
      if(requestProducto.CodigoProducto === '' || requestProducto.CodigoProducto == null || requestProducto.Descripcion == '%'){
        requestProducto.Descripcion = '%'
        requestProducto.CodigoProducto = '0'
      }
        this.productoService.listarfiltro(requestProducto).subscribe(
          response => {
            this.productoResponse = response;
            this.dataTable = this.productoResponse.datos.result;
          },
          error => {
            console.log(error);
          }
        );

  
  }}

  

}
