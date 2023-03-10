export interface TiendaResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaTienda[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaTienda{
  codigoTienda:number;
  descripcion:string;
  direccion:string;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}