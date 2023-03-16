import { Observable } from "rxjs/internal/Observable";
import { guardaalmacenrequest, almacenrequest, editaalmacenrequest } from "./request/medida_request";
import { AlmacenResponse} from "./response/medida_response";

export abstract class MedidaRepository{

    //abstract insert( fd : ParteEntity):Observable<ParteInsertResponse>;
    abstract listar( fd : almacenrequest):Observable<AlmacenResponse>;
    abstract listarfiltro(fd : almacenrequest):Observable<AlmacenResponse>;
    abstract guardaalmacen(fd : guardaalmacenrequest):Observable<AlmacenResponse>;
    abstract editaalmacen(fd: guardaalmacenrequest):Observable<AlmacenResponse>;
} 