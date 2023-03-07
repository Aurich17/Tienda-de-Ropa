export interface LoteResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaLote[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaLote{
  codigoLote:number;
  descripcion:string;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}