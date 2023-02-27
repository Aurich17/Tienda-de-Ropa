import { Observable } from "rxjs/internal/Observable";
import { rolusuariorequest } from "./request/rol_usuario_request";
import { RolUsuarioResponse } from "./response/rol_usuario_response";

export abstract class RolRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : rolusuariorequest):Observable<RolUsuarioResponse>;
} 
    //