import { Observable } from "rxjs/internal/Observable";
import { editamenurequest, guardamenurequest, menurequest } from "./request/menu_request";
import { MenuResponse } from "./response/menu_response";

export abstract class MenuRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : menurequest):Observable<MenuResponse>;
    abstract listarfiltro(fd : menurequest):Observable<MenuResponse>;
    abstract guardamenu(fd : guardamenurequest):Observable<MenuResponse>;
    abstract editamenu(fd: guardamenurequest):Observable<MenuResponse>;
} 
    // abstract update(aperturaparte: ParteUpdateEntity):  Observable<ParteInsertResponse> 
    // //abstract listar(requestparte: RequestParte):Observable<ParteResponse>;
    // abstract listar(requestparte: RequestParte):Observable<ParteResponse>;
   
    // abstract listarempleado(empleado: AperturaParteEmpleado):Observ