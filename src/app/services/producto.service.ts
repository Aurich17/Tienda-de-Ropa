import { guardaproductorequest, productorequest, editaproductorequest } from './../producto/domain/request/producto_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductoResponse } from '../producto/domain/response/producto.response';
import { StorageService } from './storage.service';
import { ProductoRepository } from '../producto/domain/producto.repository';

@Injectable()
export class ProductoService extends ProductoRepository{
  
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

  guardaproducto(prolrequest:guardaproductorequest): Observable<ProductoResponse>
  {
    return this.http.post<ProductoResponse>(`${environment.PATH_API}/Producto/MantProducto`,prolrequest);
  }
  editaproducto(prolrequest:editaproductorequest): Observable<ProductoResponse>
  {
    return this.http.post<ProductoResponse>(`${environment.PATH_API}/Producto/MantProducto`,prolrequest);
  }
}

