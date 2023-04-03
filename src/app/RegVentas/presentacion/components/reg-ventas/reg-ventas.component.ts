import { ClienteResponse, VentaResponse } from './../../../domain/response/cliente_response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { BuscarClienteComponent } from '../buscar-cliente/buscar-cliente.component';
import { BuscarProductoComponent } from '../buscar-producto/buscar-producto.component';
import { ClienteRepository } from 'src/app/RegVentas/domain/cliente.repository';
import { ListaCliente, ListaProducto, ProductoResponse } from 'src/app/RegVentas/domain/response/cliente_response';
import { DetalleRequest, clienterequest, productorequest, ventarequest } from 'src/app/RegVentas/domain/request/cliente_request';
import { Type } from '@angular/compiler';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { MatTable } from '@angular/material/table';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';



export interface Producto {
  codigo: number;
  descripcion: string;
  precio: number;
}
@Component({
  selector: 'app-reg-ventas',
  templateUrl: './reg-ventas.component.html',
  styleUrls: ['./reg-ventas.component.css']
})


export class RegVentasComponent implements OnInit {

  datosFila: any;
  table: MatTable<any>;
  descripcion:string
  groupProducto:FormGroup
  groupCliente:FormGroup
  listaCliente : ListaCliente
  listaProducto : ListaProducto
  productoResponse:ProductoResponse
  clienteResponse: ClienteResponse
  stock: number = 5;
  precioReal: number = 0;
  fechaActual: Date = new Date();
  fechaString: string = this.fechaActual.toISOString().slice(0, 19).replace('T', ' ');
  cantidad: number;
  descuento:number = 0;
  precioSugerido = 0;
  buscarProducto = BuscarProductoComponent;
  buscarCliente = BuscarClienteComponent;
  agregarCliente = AgregarClienteComponent;
  descProducto:string;
  codigo:number;
  tablaProductos = []
  clientes: ListaCliente[] = [];
  productos: ListaProducto[] = [];
  datosTabla = [];
  metadataTable = [
    { field: 'codigo', title: 'Codigo'},
    { field: 'descripcion', title: 'Descripción' },
    { field: 'cantidad', title: 'Cantidad'},
    { field: 'precioFinal', title:'Sub Total' },
    { field: 'precioSugerido', title:'Precio Sujerido' },
    { field: 'descuento', title:'Descuento'},
  ];
  
  //Variables de cliente
  codigoCliente:number;
  nombre:string
  tDocumento:string
  nDocumento:string
  telefono:string
  direccion:string

  //Varoles Finales
  subTotal:number = 0;
  descuentoTotal:number = 0;
  igv:number = 0;
  total:number = 0;

  //Comprobante
  groupVenta:FormGroup
  ventaResponse:VentaResponse
  
  initializeForm(){
    this.groupProducto = new FormGroup({
    codigo : new FormControl(0,Validators.required),
    cantidad : new FormControl(1,Validators.required),
    descuento : new FormControl(0,Validators.required),
   });

   this.groupCliente = new FormGroup({
    codigo: new FormControl(null,null),
    nombre : new FormControl(null,null),
    tDocumento : new FormControl(null,null),
    telefono : new FormControl(null,null),
    direccion : new FormControl(null,null),
    tipoDocumento : new FormControl(null,null),
    nroDocumento : new FormControl(null,null),
   })

   this.groupVenta = new FormGroup({
    documento: new FormControl(null,null),
   })
   }


  constructor(public matDialog: MatDialog, private readonly util : UtilService,  private readonly productoService : ClienteRepository, private readonly clienteService : ClienteRepository, private readonly storage :StorageService, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.initializeForm();
    this.listarProducto();
  }

  openModal(valor){
   const options = {
     disableClose: true,
     panelClass:'buscaProducto',
   };
 
   const reference =  this.util.openModal(
    valor,
      options,   
     );
     reference.subscribe((response) => {
       if (response){
       }
     });
 }

 listarProducto(){
  if (this.groupProducto.valid){ //Esto valida que todos los campos requeridos sean validos
    const values = this.groupProducto.value
    
    const requestProducto: productorequest =<productorequest>{}//  this.group.value;
    requestProducto.CodigoEmpresa = this.storage.get("codcompania").toString()
    requestProducto.CodigoProducto = values['codigo']
    requestProducto.Descripcion= '%'
    requestProducto.Color = '%'
    requestProducto.Talla = '%'
    requestProducto.Tipo_Prenda = 0
    requestProducto.Genero = '%'
    requestProducto.Estado= 'A'
    if(requestProducto.CodigoProducto === '' || requestProducto.CodigoProducto === null || requestProducto.Descripcion == '%'){
      requestProducto.Descripcion = ''
      this.descProducto = ''
      this.precioReal = 0
    }
    
    if(requestProducto.CodigoProducto != '0'){
      this.productoService.listarfiltro(requestProducto).subscribe(
        response => {
          this.productoResponse = response;
          this.productos = this.productoResponse.datos.result;
          this.descProducto = this.productos[0].descripcion
          this.precioReal = this.productos[0].precioUnitario;
          this.precioSugerido = this.precioSugerido
          this.codigo = this.productos[0].codigoProducto
          this.precioFinal()
        },
        error => {
          console.log(error);
        }
      );
    }
    
  }}
  
  contador = 0
  addData() {
    this.subTotal = 0
    this.descuentoTotal = 0
    const values = this.groupProducto.value
    let tablaAgrega = [];
    tablaAgrega.push(this.codigo)
    tablaAgrega.push(this.descProducto);
    tablaAgrega.push(values['cantidad'])
    tablaAgrega.push(this.precioSugerido);
    tablaAgrega.push(this.precioReal);
    //tablaAgrega.push(values['descuento']*this.precioSugerido)
    tablaAgrega.push(values['descuento']*values['cantidad'])
    
    let found = false;
    for(let i = 0; i<this.tablaProductos.length; i++){
      if(this.tablaProductos[i][0] == tablaAgrega[0]){//Codigo
        this.tablaProductos[i][1] = tablaAgrega[1]//Producto
        this.tablaProductos[i][2] += tablaAgrega[2]//Cantidad
        this.tablaProductos[i][3] += tablaAgrega[3]//Descuento
        this.tablaProductos[i][4] = this.precioReal//Precio Sujerido
        this.tablaProductos[i][5] += tablaAgrega[5]//SubTotal
        //this.tablaProductos[i][4] = tablaAgrega[]
        found = true;
        this.guardarTabla();
        break
      }
    }
    if(!found){
      this.tablaProductos.push(tablaAgrega)
      this.guardarTabla();
    }
  }
  
  precioFinal(){
    const values = this.groupProducto.value
    this.precioSugerido = (this.precioReal - values['descuento']) * values['cantidad']
  }

listarCliente(){
  // console.log(this.jj)
  if (this.groupCliente.valid){
   
    //const fd= new FormData();
    const values = this.groupCliente.value
  
    const requestCliente: clienterequest =<clienterequest>{}//  this.group.value;
   
    requestCliente.CodigoCliente = values['codigo']
    requestCliente.tipoCliente = '%'
    requestCliente.nombres= '%'
    requestCliente.apellidopaterno = '%'
    requestCliente.apellidomaterno = '%'
    requestCliente.c_razonsocial = '%'
    requestCliente.tipodocumento = '%'
    requestCliente.numerodocumento = '%'
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
        this.clientes = this.clienteResponse.datos.result;
        this.groupCliente.controls['nombre'].setValue(this.clientes[0].nombres);
        this.groupCliente.controls['nroDocumento'].setValue(this.clientes[0].numerodocumento);
        this.groupCliente.controls['tipoDocumento'].setValue(this.clientes[0].tipodocumento);
        this.groupCliente.controls['direccion'].setValue(this.clientes[0].direccion);
        //this.dataTable = this.productoResponse.datos.result;
      },
      error => {
        console.log(error);
      }
    );
}}

eliminarFila(i: number) {
  this.tablaProductos.splice(i, 1);
  this.subTotal = 0
  this.descuentoTotal = 0
  this.guardarTabla()
}
guardarTabla() {
  this.datosTabla = this.tablaProductos;
  if(this.datosTabla.length != 0){
    for(let i=0; i<this.datosTabla.length; i++){
      this.subTotal += Number(this.datosTabla[i][3])
      this.descuentoTotal += Number(this.datosTabla[i][5])
      this.igv = Number((Number(this.subTotal)*0.18).toFixed(2))
      this.total = Number((this.subTotal + this.igv).toFixed(2))
    }
  }
  else{
    this.subTotal = 0
    this.descuentoTotal = 0
    this.igv = 0
    this.total = 0
  }
}

//Comprobante
crearVenta(){
  if(this.groupVenta.valid){
    const values = this.groupVenta.value;
    const valuesCliente = this.groupCliente.value;

    const requestVenta: ventarequest = <ventarequest>{};

    requestVenta.CodigoComprobante = '0';
    requestVenta.CodigoTipoDocumento = values['documento'];
    requestVenta.SerieDocumento = '001';
    requestVenta.NroDocumento = '1';
    requestVenta.TipoCambio = '3.35';
    requestVenta.DocumentoReferencia = '';
    requestVenta.CodigoCliente = '1';
    requestVenta.ClienteNombre = valuesCliente['nombre'];
    requestVenta.ClienteDireccion = valuesCliente['direccion']
    requestVenta.ClienteTelefono = valuesCliente['telefono'];
    requestVenta.ClienteTipoDoc = valuesCliente['tipoDocumento'];
    requestVenta.ClienteDocumento = valuesCliente['nroDocumento'];
    requestVenta.CodigoVendedor = '1';
    requestVenta.Periodo = '202303';
    requestVenta.FechaEmision = String(this.fechaString);
    requestVenta.SubTotal = this.subTotal;
    requestVenta.IGV = this.igv;
    requestVenta.MontoTotal = this.total;
    requestVenta.FechaAnulacion = null;
    requestVenta.Estado = 'PR';
    requestVenta.Usuario = 'ADMIN';
    requestVenta.Tipo = 'I';
    requestVenta.CodigoEmpresa = '00000001';

    const detalleVenta: DetalleRequest[] = [];

    // Aquí construimos el array de DetalleRequest utilizando los datos del formulario
    
    for(let i = 0; i<this.datosTabla.length;i++){
        const detalleRequest: DetalleRequest = <DetalleRequest>{};
        detalleRequest.CodigoComprobante = '0';
        detalleRequest.CodigoProducto = this.datosTabla[i][0];
        detalleRequest.Cantidad =  this.datosTabla[i][2];
        detalleRequest.PrecioSugerido = this.datosTabla[i][4];
        detalleRequest.Descuento = this.datosTabla[i][5];
        detalleRequest.PrecioFinal = this.datosTabla[i][3];
        detalleRequest.SubTotal = this.datosTabla[i][2]*this.datosTabla[i][4];
        detalleRequest.CodigoEmpresa = '00000001';
        detalleRequest.Estado = 'PR';
        detalleRequest.Accion = 'I';
  
        detalleVenta.push(detalleRequest);  
      };
      requestVenta.ComprobanteDetalle = detalleVenta;
  
      this.clienteService.guardaComprobante(requestVenta).subscribe(
        response => {
          this.ventaResponse = response
          this.util.showMessage('GUARDADO CORRECTAMENTE')
        },
        error => {
          console.log(error);
        }
      );

  }
}

}

    