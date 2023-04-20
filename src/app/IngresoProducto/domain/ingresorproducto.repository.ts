import { Observable } from "rxjs";
import { IngresoProductoRequest, ParametrosRequest } from "./ingresoproducto-request";
import { IngresoProductoResponse, ParametrosResponse, TransaccionResponse } from "./ingresoproducto-response";



export abstract class IngresoProductoRepository{

    abstract listartransaccion(ingresoproducto:IngresoProductoRequest): Observable<IngresoProductoResponse> 
    abstract GuardarTransaccion(Request:IngresoProductoRequest): Observable<TransaccionResponse>
    abstract ListarCorrelativo (Request :ParametrosRequest ): Observable<ParametrosResponse>
  
   

    
}



