import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { dashboardventasrequest, graficorequest } from 'src/app/Graficos/domain/request/grafico_request';
import { GraficoService } from 'src/app/services/graficos.service';
import { GraficoRepository } from 'src/app/Graficos/domain/graficos.repository';
import { DashboardVentasResponse, GraficoResponse } from 'src/app/Graficos/domain/response/grafico_response';
import { ListaISProducto } from 'src/app/Graficos/domain/response/grafico_response';
import { productorequest } from 'src/app/producto/domain/request/producto_request';
import { StorageService } from 'src/app/services/storage.service';
import { ProductoRepository } from 'src/app/producto/domain/producto.repository';
import { ProductoResponse } from 'src/app/producto/domain/response/producto.response';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-producto',
  templateUrl: './dashboard-producto.component.html',
  styleUrls: ['./dashboard-producto.component.css']
})
export class DashboardProductoComponent {

  //PRODUCTOS
  groupProducto:FormGroup
  groupFecha:FormGroup
  productoResponse:ProductoResponse
  arrayFechaInicio = []
  arrayMontoTotal = []
  listaAlmacen : ListaISProducto = <ListaISProducto>{}
  almacenResponse:GraficoResponse = <GraficoResponse>{}
  ventasResponse: DashboardVentasResponse = <DashboardVentasResponse>{}
  productosEntrada = 0
  productosSalida = 0
  productoNombre = ''

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  iniciaFormulario(){
    this.groupProducto = new FormGroup({
      codigoProducto: new FormControl(null,null)
    })
  }

  ngOnInit(): void {
    this.iniciaFormulario()
    this.listarDashboardVentas()
  }

  constructor(private readonly graficoService : GraficoRepository,private readonly storage :StorageService,private readonly productoService : ProductoRepository){}

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 50
      }
    },
    plugins: {
      legend: {
        display: false, //Esto muestra las leyendas
      },
      datalabels: {
        anchor: 'end',
        align: 'center'
      }
    }
  };
  public barChartType: ChartType = 'bar'; //Para elegir el modelo de graficos
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'>

  listarDashboardVentas(){
    const values = this.groupProducto.value
    this.arrayFechaInicio = []
    this.arrayMontoTotal = []
    const requestDashboardVentas: dashboardventasrequest = <dashboardventasrequest>{}
    requestDashboardVentas.CodigoProducto = values['codigoProducto']
    requestDashboardVentas.FechaInicio = "2021-01-01T00:00:00"
    requestDashboardVentas.FechaFin = "2024-09-01T00:00:00"
    requestDashboardVentas.Semana = 0
    requestDashboardVentas.Descripcion = ''
    requestDashboardVentas.Estado = 'PR'
    requestDashboardVentas.CodigoEmpresa = "00000001"

    this.graficoService.dashboardventas(requestDashboardVentas).subscribe(response =>{
      this.ventasResponse = response;
      for(let i = 0; i<this.ventasResponse.datos.result.length; i++){
        this.arrayFechaInicio.push(this.ventasResponse.datos.result[i].fechaEmision)
        this.arrayMontoTotal.push(this.ventasResponse.datos.result[i].montoTotal)
      }
      this.barChartData = {
        labels: this.arrayFechaInicio,
        datasets: [
          { data: this.arrayMontoTotal,
            label: this.productoNombre,
            backgroundColor: ['rgba(67, 160, 71, 0.5)', 'rgba(255, 138, 101, 0.5)', 'rgba(33, 150, 243, 0.5)',
                              'rgba(233, 30, 99, 0.5)', 'rgba(205, 220, 57, 0.5)', 'rgba(255, 193, 7, 0.5)',
                              'rgba(156, 39, 176, 0.5)', 'rgba(3, 169, 244, 0.5)' ]
          },
        ]
      };
    })
  }



  // events,
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
