import { Observable } from "rxjs/internal/Observable";
import { guardarolrequest, rolrequest } from "./request/rol_request";
import { RolResponse } from "./response/rol_response";

export abstract class RolRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : rolrequest):Observable<RolResponse>;
    abstract listarfiltro(fd : rolrequest):Observable<RolResponse>;
    abstract guardarol(fd : guardarolrequest):Observable<RolResponse>;
    abstract editarol(fd: guardarolrequest):Observable<RolResponse>;
} 
    // abstract update(aperturaparte: ParteUpdateEntity):  Observable<ParteInsertResponse> 
    // //abstract listar(requestparte: RequestParte):Observable<ParteResponse>;
    // abstract listar(requestparte: RequestParte):Observable<ParteResponse>;
   
    // abstract listarempleado(empleado: AperturaParteEmpleado):Observ