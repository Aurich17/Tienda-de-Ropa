import { Observable } from "rxjs/internal/Observable";
import { editapromocionrequest, guardapromocionrequest, promocionrequest } from "./request/promociones_request";
import { PromocionResponse } from "./response/promociones_response";

export abstract class PromocionRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : promocionrequest):Observable<PromocionResponse>;
    abstract listarfiltro(fd : promocionrequest):Observable<PromocionResponse>;
    abstract guardapromocion(fd : guardapromocionrequest):Observable<PromocionResponse>;
    abstract editapromocion(fd: editapromocionrequest):Observable<PromocionResponse>;
} 