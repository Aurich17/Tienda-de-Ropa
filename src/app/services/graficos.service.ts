import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { GraficoRepository } from '../Graficos/domain/graficos.repository';
import { DashboardIndicadorResponse, DashboardPromedioVentasResponse, DashboardVentasResponse} from '../Graficos/domain/response/grafico_response';
import { dashboardventasrequest, graficorequest } from '../Graficos/domain/request/grafico_request';

@Injectable()
export class GraficoService extends GraficoRepository{

  constructor(private readonly http:HttpClient,
    private readonly storage: StorageService

    ){

    super();
  }
  dashboardventas(prolrequest:dashboardventasrequest): Observable<DashboardVentasResponse>
    {
      return this.http.post<DashboardVentasResponse>(`${environment.PATH_API}/DashboardVentas/ListarDashboarVentas/`,prolrequest)
    }
  dashboardpromedioventas(prolrequest:dashboardventasrequest):Observable<DashboardPromedioVentasResponse>
    {
      return this.http.post<DashboardPromedioVentasResponse>(`${environment.PATH_API}/DashboardVentas/ListarDashboarPromedioVentas/`,prolrequest)
    }
  dashboardindicador(prolrequest:dashboardventasrequest):Observable<DashboardIndicadorResponse>
    {
      return this.http.post<DashboardIndicadorResponse>(`${environment.PATH_API}/DashboardVentas/ListarDashboarIndicador/`,prolrequest)
    }
}
