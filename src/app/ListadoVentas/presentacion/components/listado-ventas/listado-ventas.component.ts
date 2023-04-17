import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ListadoVentasRepository } from '../../../domain/listadoVentas.respository';
import { listadoVentasRequest } from '../../../domain/request/listadoVentas_request';
import { ListaVentas, ListaVentasResponse } from '../../../domain/response/listadoVentas.response';
import { MetadataTable } from '../../../../interfaces/metada-table.interface';
import { ListadoVentasService } from '../../../../services/listVentas.service';
import { Router } from '@angular/router';

//@ts-ignore
@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css']
})

export class ListadoVentasComponent implements OnInit {

  groupVentas:FormGroup
  value:string
  dataTable: ListaVentas[]
  listadoVentasResponse: ListaVentasResponse

  valor:ListaVentasResponse;



  metadataTable: MetadataTable[] = [
    {field:"codigoComprobante",title:"Cod.Comprobante"},
    {field:"codigoCliente", title: "Cod.Cliente"},
    {field:"codigoTipoDocumento",title: "Tipo Documento"} ,
    {field:"nroDocumento", title: "Nro. Documento"},
    {field:"clienteNombre", title: "Cliente"},
    {field:"montoTotal", title: "Monto Total"},
    {field:"fechaEmision", title: "Fecha"},
    {field:"usuario_reg", title: "Usuario"},
  ];

  initializeForm(){
    this.groupVentas = new FormGroup({
      name: new FormControl(null,null),
      tDocumento: new FormControl(null,null),
      nDocumento: new FormControl(null,null),
      tienda: new FormControl(null,null),
      fechaInicio: new FormControl(null, null),
      fechaFin: new FormControl(null,null)
    })
  }
  constructor( private readonly listadoVentasService : ListadoVentasRepository, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
    this.muestra()
  }

  abrirComponenteDestino(row:any) {
    this.router.navigate(['/Registro', row]);
  }

  muestra(){
    if (this.groupVentas.valid){

      const fd= new FormData();
      const values = this.groupVentas.value

      const requestListadoVentas: listadoVentasRequest =<listadoVentasRequest>{}//  this.group.value;


      requestListadoVentas.CodigoComprobante = "0"
      requestListadoVentas.CodigoCliente = "0"
      requestListadoVentas.FechaInicio= values['fechaInicio']
      requestListadoVentas.FechaFin= values['fechaFin']
      requestListadoVentas.CodigoTipoDocumento =values['tDocumento']
      requestListadoVentas.CodigoTienda ="0"
      requestListadoVentas.CodigoEmpresa="00000001"

      if(requestListadoVentas.FechaInicio === '' || requestListadoVentas.FechaInicio == null){
        requestListadoVentas.FechaInicio = "1980-04-09T00:00:00"
      }
      if(requestListadoVentas.FechaFin === '' || requestListadoVentas.FechaFin == null){
        requestListadoVentas.FechaFin ="2040-04-09T00:00:00"
      }
      if(requestListadoVentas.CodigoTipoDocumento === '' || requestListadoVentas.CodigoTipoDocumento == null){
        requestListadoVentas.CodigoTipoDocumento =""
      }
        this.listadoVentasService.listar(requestListadoVentas).subscribe(response =>
          {
            this.listadoVentasResponse = response
            const fechasEmision = this.listadoVentasResponse.datos.result.map(venta =>{
              const fecha = new Date(venta.fechaEmision);
              const dia = fecha.getDate().toString().padStart(2, '0');
              const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
              const anio = fecha.getFullYear().toString();
              venta.fechaEmision = `${dia}/${mes}/${anio}`;
              return venta;
            });
            this.dataTable = this.listadoVentasResponse.datos.result;
          }
        )
  }
  }

}
