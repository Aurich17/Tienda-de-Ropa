import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

import { StorageService } from '../../../../services/storage.service';

import { MetadataTable } from '../../../../interfaces/metada-table.interface';
import { Router } from '@angular/router';

import { ClienteRepository } from 'src/app/regventas/domain/cliente.repository';

import { ProductoResponse, ListaProducto } from 'src/app/regventas/domain/response/cliente_response';
import { productorequest } from 'src/app/regventas/domain/request/cliente_request';


//@ts-ignore
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
    {field:"codigoProducto",title: "Cod.Producto"},
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

  constructor(private readonly  reference: MatDialogRef<BuscarProductoComponent>,  private readonly productoService : ClienteRepository,private readonly storage :StorageService,private router: Router) { }

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

      if(requestProducto.CodigoProducto === '' || requestProducto.CodigoProducto == null){
        requestProducto.CodigoProducto = '0'
      }
      if(requestProducto.Descripcion === null || requestProducto.Descripcion === ''){
        requestProducto.Descripcion = '%'
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

  navigateToRegVentas(row: any): void {
    this.router.navigate(['/Registro'], {
      queryParams: {
        codigoProducto: row.codigoProducto,
      }
    }
    );
    this.closeModal()
  }



}
