import { Observable } from "rxjs/internal/Observable";

import { listadoVentasRequest } from "./request/listadoVentas_request";
import { ListaVentasResponse } from "./response/listadoVentas.response";
import { parametrosRequest } from "src/app/regventas/domain/request/cliente_request";
import { ParametrosResponse } from "src/app/regventas/domain/response/cliente_response";



export abstract class ListadoVentasRepository{
    abstract listar( fd : listadoVentasRequest):Observable<ListaVentasResponse>;

}
