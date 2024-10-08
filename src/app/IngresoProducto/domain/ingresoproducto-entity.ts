

export interface  IngresoProducto{

 TipoTransaccion :string , 
 desTipoTransaccion : string ,
 CodigoTienda: number ,
 desTienda:string ,
 CodigoAlmacen:number ,
 desAlmacen : string  ,
 TipoDocumento:string ,
 NroDocumento:string ,
 FechaDocumento : string ,
 Periodo :number ,
 MontoTotalCab: number,
 CodigoProducto:number ,
 desProducto : string ,
 Cantidad: number,
 PrecioUnitario :number ,
 MontoTotalDet:number ,
 Observaciones:string ,
 estado :string ,
 usuario_reg :string ,
 fecha_hora_reg :string ,
 usuario_mod:string ,
 fecha_hora_mod :string 
}


export interface TransaccionDetalle {


    CodigoTransaccion:Number
    Descripcion : string,
    TipoDocumento : string
	NroDocumento  :string
	CodigoProducto :string 
	Lote :string 
	cantidad  : number 
	PrecioUnitario :number
	MontoTotal :number
	Observaciones :string,
	Estado :string,
	
	IsEditing: boolean

}
