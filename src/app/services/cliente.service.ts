
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { ClienteRepository } from '../regventas/domain/cliente.repository';
import { ClienteResponse, ParametrosResponse, ProductoResponse, VentaResponse } from '../regventas/domain/response/cliente_response';
import { clienterequest, parametrosRequest, productorequest, ventarequest } from '../regventas/domain/request/cliente_request';

//@ts-ignore
@Injectable()
export class ClienteService extends ClienteRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService

    ){

    super();
  }

  listar(prolrequest:productorequest): Observable<ProductoResponse>
    {
        return this.http.post<ProductoResponse>(`${environment.PATH_API}/Producto/listaProducto/`,prolrequest);
    }
  listarfiltro(prolrequest:productorequest): Observable<ProductoResponse>
    {
      return this.http.post<ProductoResponse>(`${environment.PATH_API}/Producto/listaProducto/`,prolrequest);
    }
  listarcliente(prolrequest:clienterequest):Observable<ClienteResponse>
  {
    return this.http.post<ClienteResponse>(`${environment.PATH_API}/cliente/ListaCliente/`,prolrequest);
  }
  guardaComprobante(prolrequest:ventarequest): Observable<VentaResponse>
  {
    return this.http.post<VentaResponse>(`${environment.PATH_API}/comprobante/mantcomprobante/`,prolrequest);
  }
  listaParametros(prolrequest:parametrosRequest): Observable<ParametrosResponse>
  {
      return this.http.post<ParametrosResponse>(`${environment.PATH_API}/ventas/listaparametros/`,prolrequest);
  }
}

