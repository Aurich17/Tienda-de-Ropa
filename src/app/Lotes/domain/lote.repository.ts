import { Observable } from "rxjs/internal/Observable";
import { loterequest, guardaloterequest, editaloterequest } from "./request/lote_request";
import { LoteResponse } from "./response/lote_response";


export abstract class LoteRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listarLote( fd : loterequest):Observable<LoteResponse>;
    abstract listarfiltro(fd : loterequest):Observable<LoteResponse>;
    abstract guardalote(fd : guardaloterequest):Observable<LoteResponse>;
    abstract editalote(fd: editaloterequest):Observable<LoteResponse>;
} 