export interface RolUsuarioResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaRoles[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaRoles{
  codigoRol:number;
  descripcion:string;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}