import { Observable } from "rxjs/internal/Observable";
import { listadoKardex } from "./request/kardex.request";
import { ListaKardexResponse } from "./response/kardex.response";


export abstract class ListadoKardexRepository{
    abstract listarKardex( fd : listadoKardex):Observable<ListaKardexResponse>;
}
