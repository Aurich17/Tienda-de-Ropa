import { result } from './../../../usuario/domain/user-entity';
export interface ClienteResponse{

    datos : {status:number ,TotalRegistro : number ,

        result :ListaCliente[]

    },


    meta: { mensaje : string }
}

export interface ListaCliente{
  codigoCliente:number;
  tipoCliente:string;
  nombres:string;
  apellidopaterno:string
  apellidomaterno:string
  c_razonsocial:string
  tipodocumento:string
  numerodocumento:string
  departamento:string
  provincia:string
  distrito:string
  direccion:string
  email:string
  estado:string
  usuario_reg:string
  fecha_hora_reg:string
  usuario_mod:string
  fecha_hora_mod:string
}

export interface ProductoResponse{

  datos : {status:number ,TotalRegistro : number ,

      result :ListaProducto[]

  },


  meta: { mensaje : string }
}

export interface ListaProducto{
codigoComprobante:number;
codigoProducto:number;
descripcion:string;
color:string;
talla:string;
tipoPrenda:number;
genero:string;
precioUnitario:number,
precioSugerido:number
estado:string;
descuento:number,
cantidad:number,
subTotal:number,
usuario_reg:string;
fecha_hora_reg:string;
usuario_mod:string;
fecha_hora_mod:string;
stock:number
accion:string
}

export interface EditaListaProducto{
  codigoComprobante:number;
  codigoProducto:number;
  descripcion:string;
  color:string;
  talla:string;
  tipoPrenda:number;
  genero:string;
  precioUnitario:number,
  precioSugerido:number
  estado:string;
  descuento:number,
  cantidad:number,
  subTotal:number,
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string;
  stock:number
  accion:string
}


//COMPROBANTE
export interface VentaResponse {
  status: number;
  message: string;
  data: {
    CodigoComprobante: string;
    CodigoTipoDocumento: string;
    SerieDocumento: string;
    NroDocumento: string;
    TipoCambio: string;
    DocumentoReferencia: string;
    CodigoCliente: string;
    ClienteNombre: string;
    ClienteDireccion: string;
    ClienteTelefono: string;
    ClienteTipoDoc: string;
    ClienteDocumento: string;
    CodigoVendedor: string;
    Periodo: string;
    FechaEmision: string;
    SubTotal: number;
    IGV: number;
    MontoTotal: number;
    FechaAnulacion: string;
    Estado: string;
    Usuario: string;
    Tipo: string;
    CodigoEmpresa: string;
    ComprobanteDetalle: DetalleResponse[];
  }
}

export interface DetalleResponse {
  CodigoComprobante: string;
  CodigoProducto: string;
  Cantidad: number;
  PrecioSugerido: number;
  Descuento: number;
  PrecioFinal: number;
  SubTotal: number;
  CodigoEmpresa: string;
  Estado: string;
  Accion: string;
}


//PARAMETROS
export interface ParametrosResponse{
  datos : {status:number ,TotalRegistro : number ,
    result :ListaParametros[]
},
meta: { mensaje : string }
}

export interface ListaParametros{
  sistema:string
  parametrosCodigo:string
  codigoItem:string
  descripcion:string
}
