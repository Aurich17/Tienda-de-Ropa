import { Observable } from "rxjs/internal/Observable";
import { guardaalmacenrequest, almacenrequest, editaalmacenrequest } from "../domain/request/almacen_request";
import { AlmacenResponse } from "../domain/response/almacen_response";


export abstract class AlmacenRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : almacenrequest):Observable<AlmacenResponse>;
    abstract listarfiltro(fd : almacenrequest):Observable<AlmacenResponse>;
    abstract guardaalmacen(fd : guardaalmacenrequest):Observable<AlmacenResponse>;
    abstract editaalmacen(fd: guardaalmacenrequest):Observable<AlmacenResponse>;
}
    // abstract update(aperturaparte: ParteUpdateEntity):  Observable<ParteInsertResponse>
    // //abstract listar(requestparte: RequestParte):Observable<ParteResponse>;
    // abstract listar(requestparte: RequestParte):Observable<ParteResponse>;

    // abstract listarempleado(empleado: AperturaParteEmpleado):Observ
