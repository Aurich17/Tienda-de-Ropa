import { ListaKardex, ListaKardexResponse } from './../../../domain/response/kardex.response';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlmacenResponse, ListaAlmacen } from '../../../../Almacen/domain/response/almacen_response';
import { almacenrequest } from '../../../../almacen/domain/request/almacen_request';
import { AlmacenRepository } from '../../../../almacen/domain/almacen.repository';
import { listadoKardex } from '../../../domain/request/kardex.request';
import { ListadoKardexRepository } from '../../../domain/kardex.repository';


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

  kardexResponse:ListaKardexResponse
  dataTable: ListaKardex[]
  listadoKardexResponse:ListaKardexResponse
  metadataTable = [
    { field: 'fecha_hora_reg', title: 'Fecha'},
    { field: 'tipoTransaccion', title:'Transaccion' },
    { field: 'tipoDocumento', title: 'T.Documento'},
    { field: 'nroDocumento', title:'Nro.Documento' },
    { field: 'cantidad', title:'Cantidad'},
    { field: 'usuario_reg', title:'Ult.Usuario' },
    //{ field: 'cAcumulada', title:'Cant.Acumulada' },
  ];
  iniciaFormulario(){
  this.group = new FormGroup({
    almacen : new FormControl(null,null),
    codigo : new FormControl(null,null)

  })
  }

  constructor( private readonly almacenService : AlmacenRepository, private readonly kardexService : ListadoKardexRepository) { }

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

  listarKardex(){
    const values = this.group.value
    const requestKardex: listadoKardex=<listadoKardex>{}
    requestKardex.CodigoAlmacen = values['almacen']
    requestKardex.CodigoKardex = 0
    requestKardex.PeriodoInicio = 202304
    requestKardex.PeriodoFin = 202304
    requestKardex.FechaInicio = "2023-02-01T00:00:00"
    requestKardex.FechaFin = "2023-04-16T23:59:00"
    requestKardex.CodigoProducto = values['codigo']
    requestKardex.CodigoTipoDocumento = ""
    requestKardex.TipoTransaccion = ""
    requestKardex.CodigoEmpresa = "00000001"

    if(requestKardex.CodigoAlmacen === null){
      requestKardex.CodigoAlmacen = 0
    }
    if(requestKardex.CodigoProducto === null){
      requestKardex.CodigoProducto = 0
    }

    this.kardexService.listarKardex(requestKardex).subscribe(response =>{
        this.kardexResponse = response
        this.dataTable = this.kardexResponse.datos.result;
    })
  }


}
