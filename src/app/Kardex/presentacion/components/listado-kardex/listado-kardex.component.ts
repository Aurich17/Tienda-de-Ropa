import { ListaKardex, ListaKardexResponse } from './../../../domain/response/kardex.response';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlmacenResponse, ListaAlmacen } from '../../../../Almacen/domain/response/almacen_response';
import { almacenrequest } from '../../../../almacen/domain/request/almacen_request';
import { AlmacenRepository } from '../../../../almacen/domain/almacen.repository';
import { listadoKardex } from '../../../domain/request/kardex.request';
import { ListadoKardexRepository } from '../../../domain/kardex.repository';
import { ListaProducto, ProductoResponse } from '../../../../producto/domain/response/producto.response';
import { ProductoRepository } from '../../../../producto/domain/producto.repository';
import { productorequest } from '../../../../producto/domain/request/producto_request';
import { StorageService } from '../../../../services/storage.service';


//@ts-ignore
@Component({
  selector: 'app-listado-kardex',
  templateUrl: './listado-kardex.component.html',
  styleUrls: ['./listado-kardex.component.css']
})
export class ListadoKardexComponent implements OnInit {
  group:FormGroup

  //LISTA ALMACEN
  listaAlmacen : ListaAlmacen
  almacenResponse:AlmacenResponse
  listaAlmacenes:any[]=[]

  //LISTA PRODUCTO
  listaProducto : ListaProducto
  productoResponse:ProductoResponse

  kardexResponse:ListaKardexResponse
  dataTable: ListaKardex[]
  listadoKardexResponse:ListaKardexResponse
  metadataTable = [
    { field: 'periodo', title: 'Periodo'},
    { field: 'desAlmacen', title:'Almacen Descripcion' },
    { field: 'desProducto', title:'Desc. Producto'},
    { field: 'codigoProducto', title:'Cod. Producto' },
    { field: 'fechaDocumento', title: 'Fecha'},
    { field: 'tipoDocumento', title:'T.Documento'},
    { field: 'nroDocumento', title:'Nro.Documento' },
  ];
  iniciaFormulario(){
  this.group = new FormGroup({
    almacen : new FormControl(null,null),
    codigo : new FormControl(null,null),
    periodoInicio: new FormControl(null,null),
    periodoFin: new FormControl(null,null),
    descripcion: new FormControl(null,null),
  })
  }

  constructor( private readonly almacenService : AlmacenRepository, private readonly kardexService : ListadoKardexRepository, private readonly productoService : ProductoRepository, private readonly storage :StorageService) { }

  ngOnInit(): void {
    this.iniciaFormulario()
    this.listar()
  }

  listar (){
      const requestAlmacen: almacenrequest =<almacenrequest>{}//  this.group.value;

      requestAlmacen.Descripcion='%'
      requestAlmacen.Estado='A'
      this.almacenService.listar(requestAlmacen).subscribe(response =>{

      const tiendas = response.datos.result.map(tienda => {
      return {
          nombre: tienda.descripcion,
          codigo: tienda.codigoAlmacen,
        };
      });
      this.listaAlmacenes = [...this.listaAlmacenes, ...tiendas];
      })
  }

  listarKardex(codigo){
    const values = this.group.value
    const requestKardex: listadoKardex=<listadoKardex>{}
    if(codigo != 0){
      requestKardex.CodigoProducto = codigo
    }
    requestKardex.CodigoAlmacen = values['almacen']
    requestKardex.CodigoKardex = 0
    requestKardex.PeriodoInicio = values['periodoInicio']
    requestKardex.PeriodoFin = values['periodoFin']
    requestKardex.FechaInicio = "2023-02-01T00:00:00"
    requestKardex.FechaFin = "2023-04-16T23:59:00"
    requestKardex.CodigoTipoDocumento = ""
    requestKardex.TipoTransaccion = ""
    requestKardex.CodigoEmpresa = "00000001"

    if(requestKardex.CodigoAlmacen === null){
      requestKardex.CodigoAlmacen = 0
    }
    if(requestKardex.CodigoProducto === null){
      requestKardex.CodigoProducto = 0
    }
    if(requestKardex.PeriodoInicio === null){
      requestKardex.PeriodoInicio = 202304
    }
    if(requestKardex.PeriodoFin === null){
      requestKardex.PeriodoFin = 202304
    }

    this.kardexService.listarKardex(requestKardex).subscribe(response =>{
        this.kardexResponse = response
        this.dataTable = this.kardexResponse.datos.result;
    })
  }

  listarProducto (){
    if (this.group.valid){

      const fd= new FormData();
      const values = this.group.value

      const requestProducto: productorequest =<productorequest>{}//  this.group.value;
      requestProducto.CodigoEmpresa = this.storage.get("codcompania").toString()
      requestProducto.CodigoProducto = '0'
      requestProducto.Descripcion= values['descripcion']
      requestProducto.Color = '%'
      requestProducto.Talla = '%'
      requestProducto.Tipo_Prenda = 0
      requestProducto.Genero = '%'
      requestProducto.Estado= 'A'

        this.productoService.listar(requestProducto).subscribe(response =>
          {
            console.log(response.datos.result[0].codigoProducto)
            this.productoResponse = response
            this.listarKardex(response.datos.result[0].codigoProducto)
          }
            )

  }
  }


}
