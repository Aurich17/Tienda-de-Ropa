export interface clienterequest{CodigoCliente:string,tipoCliente:string,nombres:string,apellidopaterno:string,apellidomaterno:string,c_razonsocial:string,tipodocumento:string,
numerodocumento:string,departamento:string,provincia:string,distrito:string,estado:string};
export interface productorequest{CodigoEmpresa:string,CodigoProducto:string,Descripcion:string,Color:string,Talla:string,Tipo_Prenda:number,Genero:string,Estado:string};
export interface parametrosRequest{CodigoParametros:string,CodigoSistema:string};

//Comprobante
export interface ventarequest {
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
    FechaAnulacion: any;
    Estado: string;
    Usuario: string;
    Tipo: string;
    CodigoEmpresa: string;
    CodigoTienda: string
    ComprobanteDetalle: DetalleRequest[];
  }

  export interface DetalleRequest {
    CodigoComprobante: string;
    CodigoProducto: string;
    Cantidad:number;
    PrecioSugerido: number;
    Descuento: number;
    PrecioFinal: number;
    SubTotal: number;
    CodigoEmpresa: string;
    Estado: string;
    Accion: string;
    descripcion:string;
}
