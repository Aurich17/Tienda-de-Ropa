import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IngresoProductoRequest } from "../IngresoProducto/domain/ingresoproducto-request";
import { IngresoProductoResponse } from "../IngresoProducto/domain/ingresoproducto-response";
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



}

