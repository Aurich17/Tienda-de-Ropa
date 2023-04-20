export interface MedidaResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaMedida[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaMedida{
  codigoUnidadMedida:number;
  descripcion:string;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}