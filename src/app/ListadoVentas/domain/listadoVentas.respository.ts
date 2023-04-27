import { Observable } from "rxjs/internal/Observable";
import { listadoVentasRequest } from "./request/listadoVentas_request";
import { ListaVentasResponse } from "./response/listadoVentas.response";


export abstract class ListadoVentasRepository{
    abstract listar( fd : listadoVentasRequest):Observable<ListaVentasResponse>;
} 