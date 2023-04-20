
export interface IngresoProductoResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :[]
    },
    
    meta: { mensaje : string } 
    
    }


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


   
export interface TransaccionResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :[]
    },
    
    meta: { mensaje : string } 
    
    }

   export  interface  ParametrosResponse{
    datos : {status:number ,TotalRegistro : number ,
        
        result :ListaParametros[]
    },

     meta: { mensaje : string } 

    }


    export interface ListaParametros{

        sistema: string 
        parametroCodigo:string 
        codigoItem : string 
        descripcion: string 
    
    }