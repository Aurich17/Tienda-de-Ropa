import { BuscarProductoComponent } from './../buscar-producto/buscar-producto.component';
import { BuscarClienteComponent } from './../buscar-cliente/buscar-cliente.component';
import { ClienteResponse, EditaListaProducto, VentaResponse } from './../../../domain/response/cliente_response';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { UtilService } from '../../../../services/util.service';
import { ClienteRepository } from '../../../../RegVentas/domain/cliente.repository';
import { ListaCliente, ListaProducto, ProductoResponse } from '../../../../RegVentas/domain/response/cliente_response';
import { DetalleRequest, clienterequest, parametrosRequest, productorequest, ventarequest } from '../../../../RegVentas/domain/request/cliente_request';
import { StorageService } from '../../../../services/storage.service';
import { ActivatedRoute, Router} from '@angular/router';
import { listadoVentasRequest } from '../../../../ListadoVentas/domain/request/listadoVentas_request';
import { ListadoVentasRepository } from '../../../../ListadoVentas/domain/listadoVentas.respository';
import { tiendarequest } from '../../../../Tienda/domain/request/tienda_request';
import { TiendaRepository } from '../../../../Tienda/domain/tienda.repository';
import { DialogoConfirmacionComponent } from '../../../../shared/components/dialogoconfirmacion/dialogoconfirmacion.component';

//@ts-ignore
@Component({
  selector: 'app-reg-ventas',
  templateUrl: './reg-ventas.component.html',
  styleUrls: ['./reg-ventas.component.css']
})


export class RegVentasComponent implements OnInit {
  @Input() valorRecibido:any;
  isTable: boolean;
  descripcionRopa:string;
  //VALORES QUE SE PASAN DE LA TABLA PARA MODIFICAR
  tipoParametro:string;
  nombreTienda:string;
  codigoCliente: number;

  codigoProducto:number = 0
  stock:number
  cantidad:number
  descuento:number

  //CONDICION
  condicion = true
  descuentoMaximo:number
  numero:number = 0
  productoEdita = true

  //MODAL
  buscarProducto = BuscarProductoComponent
  buscarCliente = BuscarClienteComponent

  dataTable: ListaProducto[]
  numDoc:number = 0
  titulo:string = 'REGISTRO DE VENTA'
  groupProducto:FormGroup
  groupCliente:FormGroup
  productoResponse:ProductoResponse
  clienteResponse: ClienteResponse
  precioReal: number = 0;
  fechaActual: Date = new Date();
  fechaString: string = this.fechaActual.toISOString().slice(0, 19).replace('T', ' ');
  precioSugerido = 0;
  precioSugeridoE = 0;
  descProducto:string;
  codigo:number;
  tablaProductos:any = []
  clientes: ListaCliente[] = [];
  productos: ListaProducto[] = [];
  listaTienda:any[] =[]
  listaParametros:any[]=[]
  listaProductoItem:ListaProducto
  listaProductoItemGeneral:ListaProducto[] = []
  tablaMuestra:EditaListaProducto[] = []
  metadataTable = [
    { field: 'codigoProducto', title: 'Codigo'},
    { field: 'descripcion', title: 'Descripción' },
    { field: 'cantidad', title: 'Cantidad'},
    { field: 'precioUnitario', title:'Precio Unitario' },
    { field: 'descuento', title:'Descuento'},
    { field: 'subTotal', title:'Sub Total' },
  ];

  //Variables de cliente
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
  codigoComprobante:string

  //Comprobante
  groupVenta:FormGroup
  ventaResponse:VentaResponse

  initializeForm(){
    this.groupProducto = new FormGroup({
    descripcion: new FormControl(null,null),
    codigo : new FormControl(this.codigoProducto,Validators.required),
    cantidad : new FormControl(1,Validators.required),
    descuento : new FormControl(0,Validators.required),
    precioReal: new FormControl(0,null),

   });

   this.groupVenta = new FormGroup({
    documento: new FormControl(null,null),
    tienda: new FormControl(null,null),
   })

   this.groupCliente = new FormGroup({
    codigo: new FormControl(this.codigoCliente,null),
    nombre : new FormControl(null,null),
    tDocumento : new FormControl(null,null),
    telefono : new FormControl(null, null),
    direccion : new FormControl(null,null),
    tipoDocumento : new FormControl(null,null),
    nroDocumento : new FormControl(null,null),
});

   }

  constructor( private readonly listadoVentasService : ListadoVentasRepository,public matDialog: MatDialog, private readonly util : UtilService,  private readonly productoService : ClienteRepository, private readonly clienteService : ClienteRepository, private readonly storage :StorageService, private route: ActivatedRoute, private readonly tiendaService : TiendaRepository, private dialogo: MatDialog,) { }

  ngOnInit(): void {
    this.tablaMuestra = this.listaProductoItemGeneral.map(item => ({...item}));
    this.initializeForm();

    //RECIBE VALOR
    this.route.params.subscribe(params => {
      if(params.codigoComprobante != null){
        if(this.numero === 0){
          this.numero += 1
          this.muestraComprobante(params.codigoComprobante)
        }
        this.codigoComprobante = params.codigoComprobante
        this.numDoc = params.nroDocumento;
        this.tipoParametro = params.codigoTipoDocumento
        this.listar(params.codigoTienda);
        this.titulo = 'MODIFICA VENTA'
        this.condicion = false
      }else{this.listar('%')}
    });

    //this.listarProducto();
    this.tablaProductos = []
    this.subTotal = 0
    this.descuentoTotal = 0
    this.igv = 0
    this.total = 0

    this.route.queryParams.subscribe(params => {
      if(params.nombres != null){
        this.codigoCliente = params['codigoCliente']
        this.listarCliente(this.codigoCliente)
      }
    });

    this.route.queryParams.subscribe(producto => {
      if(producto.codigoProducto != null){
        this.codigoProducto = producto['codigoProducto'];
        this.listarProducto(this.codigoProducto)
      }
    });

  }

  //LISTA DE TIENDA
  listar(value) {
    const requestTienda: tiendarequest = <tiendarequest>{};

    requestTienda.Descripcion = value;
    requestTienda.Estado = 'A';

    this.tiendaService.listar(requestTienda).subscribe(response => {
      this.nombreTienda = String(response.datos.result[0].codigoTienda)
      const tiendas = response.datos.result.map(tienda => {
        return {
          nombre: tienda.descripcion,
          codigo: tienda.codigoTienda,
        };
      });
      this.listaTienda = [...this.listaTienda, ...tiendas];
    });
  }

  //ABRE MODAL
  openModal(valor:any){
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

 //RECUPER LOS DATOS DEL PRODUCTO
 listarProducto(value){
  if (this.groupProducto.valid){ //Esto valida que todos los campos requeridos sean validos

    const requestProducto: productorequest =<productorequest>{}//  this.group.value;
    requestProducto.CodigoEmpresa = this.storage.get("codcompania").toString()
    requestProducto.CodigoProducto = value
    requestProducto.Descripcion= '%',requestProducto.Color = '%',requestProducto.Talla = '%',requestProducto.Tipo_Prenda = 0,requestProducto.Genero = '%',requestProducto.Estado= 'A'

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
          this.groupProducto.controls['descripcion'].setValue(this.productos[0].descripcion);
          this.precioReal = (this.productos[0].precioUnitario)
          this.groupProducto.controls['codigo'].setValue(this.productos[0].codigoProducto)
          this.stock = this.productos[0].stock
          this.descuentoMaximo = this.precioReal - 1
          this.precioFinal()
        }
      );
    }
  }}

  //AGREGA LOS DATOS A LA TABLA
  addData() {
      this.productoEdita = true
      const values = this.groupProducto.value

        this.listaProductoItem   = <ListaProducto>{}

        this.listaProductoItem.codigoProducto = values["codigo"]
        this.listaProductoItem.descripcion = values["descripcion"]
        this.listaProductoItem.cantidad = values['cantidad']
        this.listaProductoItem.subTotal = this.precioSugerido
        this.listaProductoItem.precioUnitario = this.precioReal
        this.listaProductoItem.descuento = values['descuento']
        this.listaProductoItem.accion = 'I'

          const index = this.listaProductoItemGeneral.findIndex(i => i.codigoProducto ===this.listaProductoItem.codigoProducto )
          if (index ===-1){
              this.dataTable = this.listaProductoItemGeneral
              this.tablaMuestra.push(this.listaProductoItem)
              this.listaProductoItemGeneral.push(this.listaProductoItem)

              this.dataTable = Array.from(this.listaProductoItemGeneral)
          }else{
            //SI EL PRODUCTO ES REPETIDO INGRESA AQUI
              for(let i = 0; i<this.listaProductoItemGeneral.length; i++){
                //EVALUA CON QUE CODIGO COINCIDE
                if(this.listaProductoItemGeneral[i].codigoProducto === this.listaProductoItem.codigoProducto){
                  //MODIFICA
                  this.tablaMuestra[i].codigoProducto = this.listaProductoItem.codigoProducto
                  this.tablaMuestra[i].descripcion = this.listaProductoItem.descripcion
                  this.tablaMuestra[i].cantidad = this.listaProductoItem.cantidad
                  this.tablaMuestra[i].subTotal = (this.precioReal - values['descuento']) * values['cantidad']
                  this.tablaMuestra[i].precioUnitario = this.listaProductoItem.precioUnitario
                  this.tablaMuestra[i].descuento = this.listaProductoItem.descuento
                  this.tablaMuestra[i].accion = 'U'

                  this.listaProductoItemGeneral[i].codigoProducto = this.listaProductoItem.codigoProducto
                  this.listaProductoItemGeneral[i].descripcion = this.listaProductoItem.descripcion
                  this.listaProductoItemGeneral[i].cantidad = this.listaProductoItem.cantidad
                  this.listaProductoItemGeneral[i].subTotal = (this.precioReal - values['descuento']) * values['cantidad']
                  this.listaProductoItemGeneral[i].precioUnitario = this.listaProductoItem.precioUnitario
                  this.listaProductoItemGeneral[i].descuento = this.listaProductoItem.descuento
                  this.listaProductoItemGeneral[i].accion = 'U'


                  this.dataTable = Array.from(this.listaProductoItemGeneral)
                }
                this.dataTable = Array.from(this.listaProductoItemGeneral)
              }
            }
            this.guardarTabla()
  }

  // editData(){
  //   const values = this.groupProducto.value

  //   this.listaProductoItem   = <ListaProducto>{}

  //   this.listaProductoItem.codigoProducto = values["codigo"]
  //   this.listaProductoItem.descripcion = values["descripcion"]
  //   this.listaProductoItem.cantidad = values['cantidad']
  //   this.listaProductoItem.subTotal = this.precioSugerido
  //   this.listaProductoItem.precioUnitario = this.precioReal
  //   this.listaProductoItem.descuento = values['descuento'] * values['cantidad']
  //   this.listaProductoItem.accion = 'I'

  // }

  //PRECIO FINAL DEL PRODUCTO CANTIDAD x PRECIO
  precioFinal(){
    const values = this.groupProducto.value
    this.precioSugerido = (this.precioReal - values['descuento']) * values['cantidad']
  }

//LISTA LOS CLIENTES
listarCliente(value){
  if (this.groupCliente.valid){

    const requestCliente: clienterequest =<clienterequest>{}

    requestCliente.CodigoCliente = value
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

    this.clienteService.listarcliente(requestCliente).subscribe(
      response => {
        this.clienteResponse = response;
        this.clientes = this.clienteResponse.datos.result;
        this.groupCliente.controls['nombre'].setValue(this.clientes[0].nombres);
        this.groupCliente.controls['nroDocumento'].setValue(this.clientes[0].numerodocumento);
        this.groupCliente.controls['tipoDocumento'].setValue(this.clientes[0].tipodocumento);
        this.groupCliente.controls['direccion'].setValue(this.clientes[0].direccion);
      },
    );
}}

//ELIMINA DATOS DE LA TABLA
EliminarItem(row: ListaProducto) {
  const index = this.listaProductoItemGeneral.findIndex(x => x.codigoProducto === row.codigoProducto);
  if (index !== -1) {
    this.listaProductoItemGeneral.splice(index, 1);
    this.tablaMuestra[index].accion = 'D';
    this.dataTable = Array.from(this.listaProductoItemGeneral);
  }
}

//APLICA LOS DATOS FINALES, SUB TOTAL, IGV...
guardarTabla() {
  if(this.listaProductoItemGeneral.length != 0){
    this.subTotal = 0
    this.descuentoTotal = 0
    this.igv = 0
    this.total = 0
    for(let i=0; i<this.listaProductoItemGeneral.length; i++){
      this.subTotal += this.listaProductoItemGeneral[i].subTotal
      this.descuentoTotal += this.listaProductoItemGeneral[i].descuento
      this.igv = Number(Number(this.subTotal*0.18).toFixed(2))
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

//GUARDA COMPROBANTE
crearVenta(){
  if(this.groupVenta.valid){
    const values = this.groupVenta.value;
    const valuesCliente = this.groupCliente.value;

    const requestVenta: ventarequest = <ventarequest>{};
    if(valuesCliente['codigo'] != undefined){
      if(valuesCliente['codigo'] === null){
        requestVenta.CodigoCliente = String(this.codigoCliente)
      }
      else{
        requestVenta.CodigoCliente = valuesCliente['codigo']
        if(requestVenta.CodigoCliente === null || requestVenta.CodigoCliente === ''){
          requestVenta.CodigoCliente = '0'
        }
      }
    }else{requestVenta.CodigoCliente = '0'}

    requestVenta.CodigoComprobante = '0';
    requestVenta.CodigoTipoDocumento = values['documento'];
    requestVenta.SerieDocumento = '001';
    requestVenta.NroDocumento = String(this.numDoc);
    requestVenta.TipoCambio = '3.35';
    requestVenta.DocumentoReferencia = '';
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
    requestVenta.CodigoTienda = values['tienda']

    if(requestVenta.ClienteDireccion === null){
      requestVenta.ClienteDireccion = ''
    }
    if(requestVenta.ClienteTelefono === null){
      requestVenta.ClienteTelefono = ''
    }
    if(requestVenta.ClienteTipoDoc === null){
      requestVenta.ClienteTipoDoc = ''
    }
    if(requestVenta.ClienteDocumento === null){
      requestVenta.ClienteDocumento = ''
    }

    const detalleVenta: DetalleRequest[] = [];

    for(let i = 0; i<this.listaProductoItemGeneral.length;i++){
        const detalleRequest: DetalleRequest = <DetalleRequest>{};
        detalleRequest.CodigoComprobante = '0';
        detalleRequest.CodigoProducto = String(this.listaProductoItemGeneral[i].codigoProducto);
        detalleRequest.Cantidad =  this.listaProductoItemGeneral[i].cantidad;
        detalleRequest.PrecioSugerido = this.listaProductoItemGeneral[i].precioUnitario;
        detalleRequest.Descuento = this.listaProductoItemGeneral[i].descuento;
        detalleRequest.PrecioFinal = this.listaProductoItemGeneral[i].precioUnitario - this.listaProductoItemGeneral[i].descuento;
        detalleRequest.SubTotal = this.listaProductoItemGeneral[i].subTotal;
        detalleRequest.CodigoEmpresa = '00000001';
        detalleRequest.Estado = 'PR';
        detalleRequest.Accion = 'I';

        detalleVenta.push(detalleRequest);
      };
      requestVenta.ComprobanteDetalle = detalleVenta;

      this.clienteService.guardaComprobante(requestVenta).subscribe(
        response => {
          this.ventaResponse = response;
          this.listaProductoItemGeneral = []
          this.util.showMessage('GUARDADO CORRECTAMENTE');
          this.ngOnInit();
          this.limpiar();
        },
        error => {
          console.log('ESTE ES EL ERROR');
          console.log(error);
        }
      );
  }
}

//EDITA COMPROBANTE
modificaVenta(){
  if(this.groupVenta.valid){
    const values = this.groupVenta.value;
    const valuesCliente = this.groupCliente.value;

    const requestVenta: ventarequest = <ventarequest>{};

    requestVenta.CodigoCliente = String(this.codigoCliente);
    requestVenta.CodigoComprobante = this.codigoComprobante;
    requestVenta.CodigoTipoDocumento = this.tipoParametro
    requestVenta.SerieDocumento = '001';
    requestVenta.NroDocumento = String(this.numDoc);
    requestVenta.TipoCambio = '3.35';
    requestVenta.DocumentoReferencia = '';
    requestVenta.ClienteNombre = this.nombre;
    requestVenta.ClienteDireccion = this.direccion
    requestVenta.ClienteTelefono = '960430798                                                                    '
    requestVenta.ClienteTipoDoc = this.tDocumento
    requestVenta.ClienteDocumento = this.nDocumento
    requestVenta.CodigoVendedor = '1';
    requestVenta.Periodo = '202303';
    requestVenta.FechaEmision = String(this.fechaString);
    requestVenta.SubTotal = this.subTotal;
    requestVenta.IGV = this.igv;
    requestVenta.MontoTotal = this.total;
    requestVenta.FechaAnulacion = null;
    requestVenta.Estado = 'PR';
    requestVenta.Usuario = 'ADMIN';
    requestVenta.Tipo = 'U';
    requestVenta.CodigoEmpresa = '00000001';
    requestVenta.CodigoTienda = this.nombreTienda

    if(requestVenta.ClienteDireccion === null){
      requestVenta.ClienteDireccion = ''
    }
    if(requestVenta.ClienteTelefono === null){
      requestVenta.ClienteTelefono = ''
    }
    if(requestVenta.ClienteTipoDoc === null){
      requestVenta.ClienteTipoDoc = ''
    }
    if(requestVenta.ClienteDocumento === null){
      requestVenta.ClienteDocumento = ''
    }

    const detalleVenta: DetalleRequest[] = [];

    this.listaProductoItemGeneral = this.tablaMuestra
    for(let i = 0; i<this.listaProductoItemGeneral.length;i++){
        const detalleRequest: DetalleRequest = <DetalleRequest>{};
        detalleRequest.CodigoComprobante = this.codigoComprobante;
        detalleRequest.CodigoProducto = String(this.listaProductoItemGeneral[i].codigoProducto);
        detalleRequest.Cantidad =  this.listaProductoItemGeneral[i].cantidad;
        detalleRequest.PrecioSugerido = this.listaProductoItemGeneral[i].precioUnitario;
        detalleRequest.Descuento = this.listaProductoItemGeneral[i].descuento;
        detalleRequest.PrecioFinal = this.listaProductoItemGeneral[i].precioUnitario - this.listaProductoItemGeneral[i].descuento;
        detalleRequest.SubTotal = this.listaProductoItemGeneral[i].subTotal; //El valor llega hasta aca correctamente pero no se agrega
        detalleRequest.CodigoEmpresa = '00000001';
        detalleRequest.Estado = 'PR';
        if(this.listaProductoItemGeneral[i].accion === undefined){
          detalleRequest.Accion = 'U'
        }else{
          detalleRequest.Accion = this.listaProductoItemGeneral[i].accion
        }
        detalleVenta.push(detalleRequest);
      };
      requestVenta.ComprobanteDetalle = detalleVenta;

        this.clienteService.guardaComprobante(requestVenta).subscribe(
          response => {
            this.ventaResponse = response;
            this.util.showMessage('MODIFICADO CORRECTAMENTE');
            this.ngOnInit();
          },
          error => {
            console.log('ESTE ES EL ERROR');
            console.log(error);
          }
        );
  }
}

//Mensaje de confirmacion, por si quiere eliminar
confirmAction(value: any) {
  this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `¿Desea Eliminar Fila?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.EliminarItem(value)
        this.guardarTabla()
      }
    });
}

//LISTA LOS PARAMETROS
  listarParametros(value)
  {
    const requestParamtros: parametrosRequest = <parametrosRequest>{};
    requestParamtros.CodigoParametros = value;
    requestParamtros.CodigoSistema = 'VET';

    this.clienteService.listaParametros(requestParamtros).subscribe(response => {
      this.numDoc = Number(response.datos.result[0].descripcion)
    });
  }

  //Muestra Comprobante
  muestraComprobante(value:any){
      const fd= new FormData();
      const requestListadoVentas: listadoVentasRequest =<listadoVentasRequest>{}//  this.group.value;

      requestListadoVentas.CodigoComprobante = value
      requestListadoVentas.CodigoCliente = "0",requestListadoVentas.FechaInicio= "1980-04-09T00:00:00",requestListadoVentas.FechaFin= "2040-04-09T00:00:00",requestListadoVentas.CodigoTipoDocumento = "",requestListadoVentas.CodigoTienda ="0"
      requestListadoVentas.CodigoEmpresa="00000001"

        this.listadoVentasService.listar(requestListadoVentas).subscribe(response =>
          {
            let datosVenta = response.datos.result[0]
            let productosComprados = response.datos.result[0].listadoProducto
            this.numDoc = Number(response.datos.result[0].nroDocumento)
            this.nombre = datosVenta.clienteNombre
            this.tDocumento = datosVenta.clienteTipoDoc
            this.nDocumento = datosVenta.clienteDocumento
            this.direccion = datosVenta.clienteDireccion
            this.codigoCliente = datosVenta.codigoCliente

            this.listaProductoItemGeneral = (productosComprados)
            this.tablaMuestra = JSON.parse(JSON.stringify(this.listaProductoItemGeneral));

            this.dataTable = Array.from(this.listaProductoItemGeneral)
            this.guardarTabla()
          }
        )
  };

  limpiar(){
    this.listaProductoItemGeneral = []
    this.dataTable = this.listaProductoItemGeneral
    this.guardarTabla()
    this.groupCliente.reset()
  }

  editaProducto(row:any){
    const index = this.listaProductoItemGeneral.findIndex(i => i.codigoProducto ===row.codigoProducto )
    this.listaProductoItemGeneral
    console.log(index)
    this.productoEdita = false
    this.listarProducto(row.codigoProducto)
    this.cantidad = row.cantidad
    this.descuento = row.descuento
  }
  salir(){
    this.productoEdita =true
    this.groupProducto.reset()
  }
}

