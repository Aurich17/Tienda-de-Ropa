import { Observable } from "rxjs/internal/Observable";
import { ListaVentasResponse } from "./response/listadoVentas.response";
import { listadoVentasRequest } from "./request/listadoVentas_request";

export abstract class ListadoVentasRepository{
    abstract listar( fd : listadoVentasRequest):Observable<ListaVentasResponse>;
} 