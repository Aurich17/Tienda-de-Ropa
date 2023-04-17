export interface ListaKardexResponse{

  datos : {status:number ,TotalRegistro : number ,

      result :ListaKardex[]

  },


  meta: { mensaje : string }
}

export interface ListaKardex{
  codigoAlmacen: number
  desAlmacen:string
  codigoProducto:number
  desProducto:string,
  codigoLote:number,
  desLote:string,
  fechaDocumento:string,
  tipoTransaccion:string,
  tipoDocumento:string,
  nroDocumento:string,
  cantidad:number,
  precioUnitario:number,
  periodo:number,
  codigoEmpresa:string,
  estado:string,
  usuario_reg:string,
  fecha_hora_reg:string,
}
