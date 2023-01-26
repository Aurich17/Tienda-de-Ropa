
export interface InformeTrazabilidadResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :InformeTrazabilidadList[]
    },
    
    meta: { mensaje : string } 
    
    }


export interface InformeTrazabilidadList{
 
        codigoParte: number,
        codigoParteActividad: number,
        codigoCompañia: string ,
        nombreCompañia: string,
        codigoEmpleado: number,
        nombreEmpleado: string,
        codigoEstacion: string ,
        nombreEstacion: string,
        codigoOrdenTrabajo: number,
        cantidadPromedio: number,
        cantidadFaltante: number,
        secuencia: number,
        cantidad: number,
        cantidadApoyo : number,
        estadoParte:string
        fechaHoraInicioActividad:string,
        fechaHoraTerminoActividad:string,
        fechaHoraTerminoOT:string ,
        fechaHoraInicioOT:string,
        estadoParteActividad:string ,
        nombreEstadoParteActividad:string
        numeroParteProduccion : number,
        turno:string
        tiempoTranscurrido:string
        tipoTiempo:string
        cantfilas:number
       
     
}