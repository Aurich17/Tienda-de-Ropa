import { Observable } from "rxjs";
import { IngresoProductoRequest } from "./ingresoproducto-request";
import { IngresoProductoResponse } from "./ingresoproducto-response";



export abstract class IngresoProductoRepository{

    abstract  listartransaccion(ingresoproducto:IngresoProductoRequest): Observable<IngresoProductoResponse> 

}
