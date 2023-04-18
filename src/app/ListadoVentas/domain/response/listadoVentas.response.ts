export interface ListaVentasResponse{

    datos : {status:number ,TotalRegistro : number ,

        result :ListaVentas[]

    },


    meta: { mensaje : string }
}

export interface ListaVentas{
    codigoComprobante: string
    codigoTipoDocumento:string
    serieDocumento:string
    nroDocumento:number
    tipoCambio:number
    documentoReferencia:string
    codigoCliente:number
    clienteNombre:string
    clienteDireccion:string
    clienteTelefono:string
    clienteTipoDoc:string
    clienteDocumento:string
    codigoVendedor:string
    periodo:string
    fechaEmision:string
    subTotalCab:number
    igv:number
    montoTotal:number
    fechaAnulacion:string
    codigoTienda:string
    estado:string
    usuario_reg:string
    codigoEmpresa:string
    codigoProducto:string
    cantidad:number
    precioSujerido:number
    descuento:number
    precioFinal:number
    subTotal:number
    listadoProducto: ListaProductos[]
}

export interface ListaProductos{
  codigoComprobante:number;
  codigoProducto:number;
  descripcion:string;
  color:string;
  talla:string;
  tipoPrenda:number;
  genero:string;
  precioUnitario:number,
  precioSugerido:number,
  estado:string;
  descuento:number,
  cantidad:number,
  subTotal:number,
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string;
  stock:number;
  accion:string;
}
