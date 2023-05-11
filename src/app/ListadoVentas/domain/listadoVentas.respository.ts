import { Observable } from "rxjs/internal/Observable";
import { listadoVentasRequest } from "../domain/request/listadoVentas_request";
import { ListaVentasResponse } from "../domain/response/listadoVentas.response";


export abstract class ListadoVentasRepository{
    abstract listar( fd : listadoVentasRequest):Observable<ListaVentasResponse>;
}
