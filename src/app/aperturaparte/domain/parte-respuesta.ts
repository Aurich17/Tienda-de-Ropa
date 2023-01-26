import { ActividadEntity } from "./parte-entity";

export interface ParteResponse{

datos : {status:number ,TotalRegistro : number ,

    result :Resultado[]
},

meta: { mensaje : string } 

}


export interface ActividadResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ActividadResponse[]
    },
    
    meta: { mensaje : string } 
    
    }


export interface ActividadResponse{
 
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

       
     
}


export interface ParteInsertResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        codigoParte: number,
        n_parteproduccion: number
    },

    meta: { mensaje : string } 
    
 }

   export interface ResultadoInsert {
    codigoParte: number,
    n_parteproduccion: number,

    }


export interface Resultado{

    codigoParte: number ,
    codigoCompañia: string,
    nombreCompañia:string ,
    codigoEmpleado: number,
    nombreEmpleado:string,
    codigoEstacion: string ,
    nombreEstacion:string ,
    codigoOrdenTrabajo: number,
    cantidadApoyo: number,
    fechaHoraInicioOT: string ,
    fechaHoraInicioActividad?: string ,
    fechaHoraTerminoActividad?: string ,
    fechaHoraTerminoOt: string ,
    estadoRegistro: string ,
    estadoParte: string,
    usuarioCreacion: string ,
    fechaHoraCreacion: string ,
    usuarioActualizacion: string,
    fechaHoraActualizacion: string ,
    codigo: string,
    codigoCompañiaNavigation: string,
    codigoEstacionNavigation: string,
    codigoOrdenTrabajoNavigation: string,
    secuencia:string,
    turno:string 
    numeroParteProduccion:number 
    parteActividads: ActividadEntity[];



    


   
   
   
  
  
 
  
   
  
 
 


   

}


export interface EmpleadoResponse{

    datos : {status:number ,TotalRegistro : number ,
    
        result :ResultadoEmpleado[]
    },
    
    meta: { mensaje : string } 
    
    }


    export interface ResultadoEmpleado{

        codigoCompañia: string,
        codigoEmpleado: number,
        nombreCompleto: string,
        tipoDocumento: string,
        documentoIdentidad: string ,
        direccion: string ,
        email: string ,
        fechaNacimiento: string,
        sexo: string ,
        telefono: string ,
        fechaUltimoIngreso: string ,
        estado: string 
    
    }




    export interface EstacionResponse{

        datos : {status:number ,TotalRegistro : number ,
        
            result :ResultadoEstacion[]
        },
        
        meta: { mensaje : string } 
        
        }

    export interface ResultadoEstacion{

        codigoEstacion: string,
        descripcion: string,
        codigoMaquina: string,
        habilitado: string,
        estado: string
    
    }



    export interface OrdentrabajoResponse{

        datos : {status:number ,TotalRegistro : number ,
            result :OrdenTrabajo
        },
        
        meta: { mensaje : string } 
        
        }


        export interface OrdenTrabajo{

            codigoCompañia:string ,
            codigoOrdenTrabajo: number,
        }




        export interface ResultMotivoParte{

            datos : {status:number ,TotalRegistro : number ,
            
                result :ResultadoMotivoParte[]
            },
            
            meta: { mensaje : string } 
            
            }
    
        export interface ResultadoMotivoParte{
    
             n_codigomotivoparte : number  ,
             c_descripcionmotivo : string
        
        }


        export interface ResultMotivoRechazo{

            datos : {status:number ,TotalRegistro : number ,
            
                result :ListadoMotivoRechazo[]
            },
            
            meta: { mensaje : string } 
            
            }
    
        export interface ListadoMotivoRechazo{
    
            codigoMotivoRechazo : string  ,
            descripcionMotivoRechazo : string
        
        }



        export interface ValidarParteResponse{

            datos : {status:number ,TotalRegistro : number 
            
               
            },
            
            meta: { mensaje : string } 
            
            }