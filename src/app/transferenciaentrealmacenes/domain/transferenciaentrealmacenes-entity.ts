export interface TransferenciaDetalle {


    CodigoTransaccion:Number
    Descripcion : string,
    TipoDocumento : string
    CodigoLote : number
    DesLote :string  
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



export interface Lote {

    CodigoLote : number 
    Descripcion: string 
}