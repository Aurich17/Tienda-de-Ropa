import { Observable } from "rxjs/internal/Observable";
import { Medidarequest, guardaMedidarequest } from "../domain/request/medida_request";
import { MedidaResponse } from "../domain/response/medida_response";



export abstract class MedidaRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : Medidarequest):Observable<MedidaResponse>;
    abstract listarfiltro(fd : Medidarequest):Observable<MedidaResponse>;
    abstract guardaalmacen(fd : guardaMedidarequest):Observable<MedidaResponse>;
    abstract editaalmacen(fd: guardaMedidarequest):Observable<MedidaResponse>;
}
