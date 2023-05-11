import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { GraficoRepository } from '../Graficos/domain/graficos.repository';
import { DashboardVentasResponse, GraficoResponse } from '../Graficos/domain/response/grafico_response';
import { dashboardventasrequest, graficorequest } from '../Graficos/domain/request/grafico_request';

@Injectable()
export class GraficoService extends GraficoRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService

    ){

    super();
  }
  listar(prolrequest:graficorequest): Observable<GraficoResponse>
    {
        return this.http.post<GraficoResponse>(`${environment.PATH_API}/Producto/ListaISProducto/`,prolrequest);
    }
  dashboardventas(prolrequest:dashboardventasrequest): Observable<DashboardVentasResponse>
    {
      return this.http.post<DashboardVentasResponse>(`${environment.PATH_API}/DashboardVentas/ListarDashboarVentas/`,prolrequest)
    }
}
