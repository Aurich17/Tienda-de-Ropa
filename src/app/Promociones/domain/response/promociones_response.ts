export interface PromocionResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaPromocion[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaPromocion{
  codigoPromocion:number;
  descripcion:string;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}
