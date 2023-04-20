export interface ProductoResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaProducto[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaProducto{
  codigoProducto:number;
  descripcion:string;
  color:string;
  talla:string;
  tipoPrenda:number;
  genero:string;
  precioUnitario:number,
  estado:string;
  stock:number;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string  
}