import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IngresoProductoRequest, ParametrosRequest } from "../IngresoProducto/domain/ingresoproducto-request";
import { IngresoProductoResponse, ParametrosResponse, TransaccionResponse } from "../IngresoProducto/domain/ingresoproducto-response";
import { IngresoProductoRepository } from "../IngresoProducto/domain/ingresorproducto.repository";
import { StorageService } from "./storage.service";

@Injectable()
export class IngresoProductoService extends IngresoProductoRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }


  listartransaccion(ingresoproducto:IngresoProductoRequest): Observable<IngresoProductoResponse> 
  {
      return this.http.post<IngresoProductoResponse>(`${environment.PATH_API}/transaccion/listartransacciones/`,ingresoproducto);
  
  }

  GuardarTransaccion(Request:IngresoProductoRequest): Observable<TransaccionResponse>
  {
    return this.http.post<TransaccionResponse>(`${environment.PATH_API}/transaccion/MantTransaccion`,Request);
  }

  ListarCorrelativo (Request :ParametrosRequest ): Observable<ParametrosResponse>

  {
    return this.http.post<ParametrosResponse>(`${environment.PATH_API}/ventas/listaparametros`,Request);
  }

 
}

