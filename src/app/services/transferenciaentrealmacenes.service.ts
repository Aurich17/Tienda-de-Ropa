import { Injectable } from "@angular/core";
import { TransferenciaEntreAlmacenesRepository } from "../transferenciaentrealmacenes/domain/transferenciaentrealmacenes.repository";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { ProductoLoteRequest } from "../transferenciaentrealmacenes/domain/transferenciaentrealmacenes-request";
import { Observable } from "rxjs";
import { ProductoLoteResponse } from "../transferenciaentrealmacenes/domain/transferenciaentrealmacenes-response";
import { environment } from "src/environments/environment";


@Injectable()
export class TransferenciaEntreAlmacenesService extends TransferenciaEntreAlmacenesRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  public  listarProductoLote(RequestProductoLote:ProductoLoteRequest): Observable<ProductoLoteResponse> 

    {
        return this.http.post<ProductoLoteResponse>(`${environment.PATH_API}/Producto/listaProductoLote/`,RequestProductoLote);
    

    }

}