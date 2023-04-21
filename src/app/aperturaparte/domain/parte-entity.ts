export interface ParteEntity{

codigoempresa :string ;
codigoEmpleado:number;
codigoEstacion:string;
codigoOrdenTrabajo :number;
cantidadApoyo:number;
fechaHoraInicioOt:string;
usuarioCreacion?: string;
fechaHoraTerminoOt?:string ;
estadoRegistro:boolean;
ParteActividades : ActividadEntity[];

}

export interface ActividadEntity{

    FechaHoraInicioActividad: string ,
    FechaHoraTerminoActividad?: string,
    Secuencia?: number,
    Cantidad?: number,
    UsuarioCreacion: string
}


export interface RequestParte{

    CodigoParte: number ,
    Codigoempresa: string ,
    CodigoEmpleado: number ,
    CodigoEstacion: string ,
    CodigoOrdenTrabajo: number ,
    EstadoParte: string,
    FechaInicio:string ,
    FechaFin:string 
}

export interface AperturaParteEmpleado{

    codigoempresa : string ,
    codigoEmpleado : number
}

export interface AperturaParteEstacion{

    CodigoEstacion:string;
    NombreEstacion:string;
}

export interface EmpleadoLista{
    codigoparteactividad:number;
    codigoEmpleado:number;
    NombreEmpleado:string;
}


export interface ParteUpdateEntity{

    codigoParte: number,
    codigoempresa: string ,
    codigoEmpleado: number,
    codigoEstacion: string ,
    codigoOrdenTrabajo: number,
    cantidadApoyo: number,            
    fechaHoraTerminoOt:string ,
    estadoParte: string ,
    estadoRegistro:boolean
    usuarioActualizacion: string ,
    fechaHoraActualizacion: string ,
    actualizaParteActividad :boolean,
    parteActividades: ActividadEntity[]

}


export interface RequestOT {

    codigoempresa : string ,
    CodigoOrdenTrabajo : number
    
}


export interface AperturaParteTransaccion
{
    CodigoParte: number,
    n_parteproduccion: number,
    codigoempresa: string ,            
    codigoEstacion: string ,
    codigoOrdenTrabajo: number,
    Turno: string ,
    cantidadApoyo: number,
    fechaHoraInicioOt: string ,
    fechaHoraTerminoOt: string,
    PasarStock: string ,
    Reproceso: string,
    CodigoMotivoParte:number
    CodigoMotivoRechazo1: string,
    CantidadRechazada1: number,
    CodigoMotivoRechazo2: string ,
    CantidadRechazada2: number,
    CodigoMotivoRechazo3: string ,
    CantidadRechazada3: number,
    secuencia: number,
    cantidad: number,
    filas : number,
    EstadoParte: string,
    NumeroParteProduccion: number,
    EstadoRegistro: boolean,
    Usuario: string, 
    Accion : string 
    parteActividades : parteActividades[]
    FlagTiempoPreparacion:boolean
}

export interface parteActividades{

    CodigoParteActividad:number,	
    codigoEmpleado: number,
    fechaHoraInicioActividad: string,
    fechaHoraTerminoActividad: string

}


export interface RequestParteActividadList
    {
        CodigoParte : number,
        CodigoParteActividad : number,
        codigoempresa : string ,
        CodigoEmpleado : number,
        FechaInicio : string ,
        FechaFin : string ,
        EstadoParte: string 
    }


    export interface RequestMotivoParte
    {

        EstadoMotivoParte :  string ,
         
    }



    export interface RequestMotivoRechazo
    {

        DescripcionMotivoRechazo :  string ,
         
    }

    export interface RequestValidarParte
        {

            codigoempresa :string ,
            CodigoOrdenTrabajo :number ,
            Secuencia :number ,
            
        }

