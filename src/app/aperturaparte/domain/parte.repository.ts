import { Observable } from "rxjs";
import { AperturaParteEmpleado, AperturaParteEstacion, AperturaParteTransaccion, ParteEntity, ParteUpdateEntity, RequestMotivoParte, RequestMotivoRechazo, RequestOT, RequestParte, RequestParteActividadList, RequestValidarParte } from "./parte-entity";
import { ActividadResponse, EmpleadoResponse, EstacionResponse, OrdentrabajoResponse, ParteInsertResponse, ParteResponse, ResultMotivoParte, ResultMotivoRechazo, ValidarParteResponse } from "./parte-respuesta";

export abstract class AperturaparteRepository{

 //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
 abstract insert( fd : AperturaParteTransaccion):Observable<ParteInsertResponse>;
 
 abstract update(aperturaparte: ParteUpdateEntity):  Observable<ParteInsertResponse> 
 //abstract listar(requestparte: RequestParte):Observable<ParteResponse>;
 abstract listar(requestparte: RequestParte):Observable<ParteResponse>;

 abstract listarempleado(empleado: AperturaParteEmpleado):Observable<EmpleadoResponse>;
 abstract listarestacion(estacion: AperturaParteEstacion):Observable<EstacionResponse>;
 abstract listarot(requestOT : RequestOT):Observable<OrdentrabajoResponse>;
 abstract listarParteActividad(requestlistar : RequestParteActividadList):Observable<ActividadResponse>;
 abstract ListarMotivoParte(request : RequestMotivoParte):Observable<ResultMotivoParte>;
 abstract ListarMotivoRechazado(request : RequestMotivoRechazo):Observable<ResultMotivoRechazo>;
  abstract ValidarParte(request : RequestValidarParte):Observable<ValidarParteResponse>;
 
}


