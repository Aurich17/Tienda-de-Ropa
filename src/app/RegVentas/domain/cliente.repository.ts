import { Observable } from "rxjs/internal/Observable";
import { clienterequest, parametrosRequest, productorequest, ventarequest } from "./request/cliente_request";
import { ClienteResponse, ParametrosResponse, ProductoResponse } from "./response/cliente_response";
import { VentaResponse } from "./response/cliente_response";
import { HttpClient } from '@angular/common/http';

export abstract class ClienteRepository{
    abstract listar( fd : productorequest):Observable<ProductoResponse>;
    abstract listarfiltro(fd : productorequest):Observable<ProductoResponse>;
    abstract listarcliente(fd:clienterequest):Observable<ClienteResponse>;
    abstract guardaComprobante(prolrequest:ventarequest): Observable<VentaResponse>;
    abstract listaParametros(prolrequest:parametrosRequest):Observable<ParametrosResponse>

    //abstract guardaproducto(fd : guardaproductorequest):Observable<ProductoResponse>;
    //abstract editaproducto(fd: guardaproductorequest):Observable<ProductoResponse>;
}
