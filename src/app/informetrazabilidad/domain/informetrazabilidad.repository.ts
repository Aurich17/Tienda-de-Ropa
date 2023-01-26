import { Observable } from "rxjs";

import { AperturaParteEstacion, RequestParte } from "src/app/aperturaparte/domain/parte-entity";
import { ActividadResponse, EstacionResponse } from "src/app/aperturaparte/domain/parte-respuesta";

import { RequestInformeTrazabilidad } from "./informetrazabilidad-entity";
import { InformeTrazabilidadResponse } from "./informetrazabilidad-response";

export abstract class InformeTrazabilidadRepository{

    // abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    // abstract update(aperturaparte : InformeParteUpdateEntity):Observable<InformeParteUpdateResponse>
   //  abstract listar(requestparte: RequestListarInformeParte):Observable<InformeParteListResponse>;

     abstract listarestacion(estacion: AperturaParteEstacion):Observable<EstacionResponse>;
     abstract  ListarTrazabilidad(requestvizualizar: RequestInformeTrazabilidad):  Observable<InformeTrazabilidadResponse> ;
  
     // updateParteActividad(aperturaparte : ParteModificarEntity):Observable<ParteUpdateResponse> 
    }