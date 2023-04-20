
export interface IngresoProductoRequest {

Codigotransaccion:number,
CodigoTipoTransaccion :string,
CodigoTienda :number,
CodigoAlmacen :number,
TipoDocumento :string,
NroDocumento :string ,
FechaDocumento :string,
Periodo :number, 
Montototal :number,
Observacion:string ,
Estado: string ,
Usuario :string ,
Tipo: string ,
CodigoEmpresa :string ,
TransaccionDetalle : ListaTransaccionDetalle[]


}

export interface ListaTransaccionDetalle {

    CodigoTransaccion:string ,
    CodigoProducto:string ,
    Cantidad:number,
    PrecioUnitario:number,
    TipoDocumento:string ,
    NroDocumento:string ,
    Lote:number,
    MontoTotal:number,
    CodigoEmpresa:string,
    Observaciones:string ,
    Estado:string ,
    Accion:string 


}



export interface  ParametrosRequest {

    CodigoParametros :string ,
    CodigoSistema :string 
}