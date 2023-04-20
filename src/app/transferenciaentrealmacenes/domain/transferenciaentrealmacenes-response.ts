export interface ProductoLoteResponse{

        datos : {status:number ,TotalRegistro : number ,
        
            result :ProdutoLoteLista[]
        },
        
        meta: { mensaje : string } 
    
}


export interface ProdutoLoteLista{


    codigoAlmacen :number
    desAlmacen :string 
    codigoProducto :number
    descripcion :string 
    codigoLote  :number
    desLote :string 
    color :string 
    talla :string 
    tipoPrenda :number
    genero :string 
    costoUnitario :number
    estado :string 
    usuario_reg  :string 
    fecha_hora_reg :string 
    usuario_mod :string 
    fecha_hora_mod :string 
    stock  :number 


}
