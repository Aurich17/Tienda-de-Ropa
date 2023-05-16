//DASHBOARD VENTAS
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


//DASHBOARD PROMEDIO VENTAS
export interface DashboardPromedioVentasResponse{
  datos : {status:number ,TotalRegistro : number ,

    result :DashboardPromedioVentas[]

  },
  meta: { mensaje : string }
}

export interface DashboardPromedioVentas{
  diaSemana:string;
  montoTotal:number;
}

//DASHBOARD INDICADOR
export interface DashboardIndicadorResponse{
  datos : {status:number ,TotalRegistro : number ,

    result :DashboardIndicador[]

  },
  meta: { mensaje : string }
}

export interface DashboardIndicador{
  cantidadVendida:number;
  totalVenta:number;
  totalUtilidad:number;
  totalCosto:number;
  porcetajeAvance:number;
  totalGasto:number;
}
