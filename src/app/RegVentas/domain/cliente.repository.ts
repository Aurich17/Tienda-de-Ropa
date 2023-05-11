import { Observable } from "rxjs/internal/Observable";
import { productorequest, clienterequest, ventarequest, parametrosRequest } from "../domain/request/cliente_request";
import { ProductoResponse, ClienteResponse, VentaResponse, ParametrosResponse } from "../domain/response/cliente_response";

export abstract class ClienteRepository{
    abstract listar( fd : productorequest):Observable<ProductoResponse>;
    abstract listarfiltro(fd : productorequest):Observable<ProductoResponse>;
    abstract listarcliente(fd:clienterequest):Observable<ClienteResponse>;
    abstract guardaComprobante(prolrequest:ventarequest): Observable<VentaResponse>;
    abstract listaParametros(prolrequest:parametrosRequest):Observable<ParametrosResponse>

    //abstract guardaproducto(fd : guardaproductorequest):Observable<ProductoResponse>;
    //abstract editaproducto(fd: guardaproductorequest):Observable<ProductoResponse>;
}
