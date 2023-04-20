import { Observable } from "rxjs";
import { ProductoLoteRequest } from "./transferenciaentrealmacenes-request";
import { ProductoLoteResponse } from "./transferenciaentrealmacenes-response";



export abstract class TransferenciaEntreAlmacenesRepository{

    abstract listarProductoLote(RequestProductoLote:ProductoLoteRequest): Observable<ProductoLoteResponse> 

  
    
}
