export interface PersonalResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaPersonal[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaPersonal{
  codigoPersonal:number;
  nombres:string;
  apellidos:string;
  dni:string;
  fecha_nac:string;
  telefono:string;
  fecha_ing:string;
  sueldo:number;
  direccion:string;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}