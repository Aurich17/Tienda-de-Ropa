export interface AlmacenResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaAlmacen[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaAlmacen{
  codigoAlmacen:number;
  descripcion:string;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}