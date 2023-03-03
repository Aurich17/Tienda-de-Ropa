import { guardamenurequest, menurequest } from './../menus/domain/request/menu_request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { MenuRepository } from '../menus/domain/menu.repository';
import { MenuResponse } from '../menus/domain/response/menu_response';

@Injectable({
  providedIn: 'root'
})
export class ManMenuService extends MenuRepository{
  
  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService
    
    ){

    super();
  }

  listar(prolrequest:menurequest): Observable<MenuResponse> 
  {
    return this.http.post<MenuResponse>(`${environment.PATH_API}/menu/ListaMenu/`,prolrequest);
  }
  listarfiltro(prolrequest:menurequest): Observable<MenuResponse>
  {
    return this.http.post<MenuResponse>(`${environment.PATH_API}/menu/ListaMenu/`,prolrequest);
  }
  guardamenu(prolrequest:guardamenurequest): Observable<MenuResponse>
  {
    return this.http.post<MenuResponse>(`${environment.PATH_API}/menu/MantMenu/`,prolrequest);
  }
  editamenu(prolrequest:guardamenurequest): Observable<MenuResponse>
  {
    return this.http.post<MenuResponse>(`${environment.PATH_API}/menu/MantMenu/`,prolrequest);
  }
}
