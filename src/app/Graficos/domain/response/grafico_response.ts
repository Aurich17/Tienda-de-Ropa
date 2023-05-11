export interface GraficoResponse{

  datos : {status:number ,TotalRegistro : number ,

      result :ListaISProducto[]

  },


  meta: { mensaje : string }
}

export interface ListaISProducto{
codigoAlmacen:number;
desAlmacen:string;
codigoProducto:number;
descripcion:string;
color:string;
talla:string;
tipoPrenda:string;
genero:string;
estado:string;
usuario_reg:string;
fecha_hora_reg:string;
usuario_mod:string;
fecha_hora_mod:string;
stock:number;
}




//PRIMER GRAFICO
export interface DashboardVentasResponse{
  datos : {status:number ,TotalRegistro : number ,

    result :DashboardVentas[]

  },

  meta: { mensaje : string }
}

export interface DashboardVentas{
  fechaEmision:string;
  montoTotal:number;
}
