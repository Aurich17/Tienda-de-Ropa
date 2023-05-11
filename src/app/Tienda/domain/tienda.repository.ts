import { Observable } from "rxjs/internal/Observable";
import { tiendarequest, guardatiendarequest, editatiendarequest } from "../domain/request/tienda_request";
import { TiendaResponse } from "../domain/response/tienda_response";


export abstract class TiendaRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : tiendarequest):Observable<TiendaResponse>;
    abstract listarfiltro(fd : tiendarequest):Observable<TiendaResponse>;
    abstract guardatienda(fd : guardatiendarequest):Observable<TiendaResponse>;
    abstract editatienda(fd: editatiendarequest):Observable<TiendaResponse>;
}
