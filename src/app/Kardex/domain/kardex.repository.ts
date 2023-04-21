import { Observable } from "rxjs/internal/Observable";
import { ListaKardexResponse } from "./response/kardex.response";
import { listadoKardex } from "./request/kardex.request";

export abstract class ListadoKardexRepository{
    abstract listarKardex( fd : listadoKardex):Observable<ListaKardexResponse>;
}
