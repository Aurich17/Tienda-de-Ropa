import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { dashboardventasrequest} from 'src/app/Graficos/domain/request/grafico_request';
import { GraficoRepository } from 'src/app/Graficos/domain/graficos.repository';
import { DashboardIndicadorResponse, DashboardPromedioVentasResponse, DashboardVentasResponse } from 'src/app/Graficos/domain/response/grafico_response';
import { StorageService } from 'src/app/services/storage.service';
import { ProductoRepository } from 'src/app/producto/domain/producto.repository';
import { ProductoResponse } from 'src/app/producto/domain/response/producto.response';
import { FormControl, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { productorequest } from 'src/app/producto/domain/request/producto_request';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-dashboard-producto',
  templateUrl: './dashboard-producto.component.html',
  styleUrls: ['./dashboard-producto.component.css']
})
export class DashboardProductoComponent {
  filteredOptions: Observable<string[]>;
  myControl = new FormControl('');
  //INDICADORES
  codigoProducto:number = 0
  cantidadVendida:number = 0
  totalVenta:number = 0
  totalUtilidad:number = 0
  totalCosto:number = 0
  porcentajeAvance:number = 0
  totalGasto:number = 0

  //PRODUCTOS
  groupProducto:FormGroup
  groupFecha:FormGroup
  productoResponse:ProductoResponse
  arrayProducto = []
  arrayFechaInicio = []
  arrayMontoTotal = []
  arrayDiasSemana = []
  arrayPromedioMontoTotal = []
  ventasResponse: DashboardVentasResponse = <DashboardVentasResponse>{}
  promedioVentasResponse: DashboardPromedioVentasResponse =<DashboardPromedioVentasResponse>{}
  indicadorResponse: DashboardIndicadorResponse = <DashboardIndicadorResponse>{}
  productosEntrada = 0
  productosSalida = 0
  productoNombre = ''

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  iniciaFormulario(){
    this.groupProducto = new FormGroup({
      codigoProducto: new FormControl(0,null),
      //descripcionProducto: new FormControl(null,null)
    })
    this.groupFecha = new FormGroup({
      fechaInicio: new FormControl(null,null),
      fechaFin: new FormControl(null,null),
      semana: new FormControl(null,null)
    })
  }

  ngOnInit(): void {
    this.iniciaFormulario()
    this.listarProducto('%')
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.arrayProducto.filter(option => option.toLowerCase().includes(filterValue));
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
  public promedioVentas: ChartData<'bar'>

  listarDashboardVentas(){
    const values = this.groupProducto.value
    const valuesFecha = this.groupFecha.value
    this.arrayFechaInicio = []
    this.arrayMontoTotal = []
    this.arrayDiasSemana = []
    this.arrayPromedioMontoTotal = []
    const requestDashboardVentas: dashboardventasrequest = <dashboardventasrequest>{}
    requestDashboardVentas.CodigoProducto = values['codigoProducto']
    requestDashboardVentas.FechaInicio = valuesFecha['fechaInicio']
    requestDashboardVentas.FechaFin = valuesFecha['fechaFin']
    requestDashboardVentas.Semana = valuesFecha['semana']
    requestDashboardVentas.Descripcion = ''
    requestDashboardVentas.Estado = 'PR'
    requestDashboardVentas.CodigoEmpresa = "00000001"

    if(requestDashboardVentas.FechaInicio == undefined){
      requestDashboardVentas.FechaInicio = "2000-01-01T00:00:00"
      requestDashboardVentas.FechaFin = "2400-01-01T00:00:00"
    }


    //GRAFICO PRINCIPAL
    this.graficoService.dashboardventas(requestDashboardVentas).subscribe(response =>{
      this.ventasResponse = response;
      const fechasEmision = this.ventasResponse.datos.result.map(venta =>{
        const fecha = new Date(venta.fechaEmision);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear().toString();
        venta.fechaEmision = `${dia}/${mes}/${anio}`;
        return venta;
      });
      for(let i = 0; i<this.ventasResponse.datos.result.length; i++){
        this.arrayFechaInicio.push(this.ventasResponse.datos.result[i].fechaEmision)
        this.arrayMontoTotal.push(this.ventasResponse.datos.result[i].montoTotal)
      }
      this.barChartData = {
        labels: this.arrayFechaInicio,
        datasets: [
          { data: this.arrayMontoTotal,
            backgroundColor: ['rgba(67, 160, 71, 0.5)']
          },
        ]
      };
    })
    //GRAFICO PROMEDIO VENTAS
    this.graficoService.dashboardpromedioventas(requestDashboardVentas).subscribe(response =>{
      this.promedioVentasResponse = response;
      for(let i = 0; i<this.promedioVentasResponse.datos.result.length; i++){
        this.arrayDiasSemana.push(this.promedioVentasResponse.datos.result[i].diaSemana)
        this.arrayPromedioMontoTotal.push(this.promedioVentasResponse.datos.result[i].montoTotal)
      }
      this.promedioVentas = {
        labels: this.arrayDiasSemana,
        datasets: [
          { data: this.arrayPromedioMontoTotal,
            backgroundColor: ['rgba(255, 138, 101, 0.5)']
          },
        ]
      };
    })
    this.graficoService.dashboardindicador(requestDashboardVentas).subscribe(response =>{
      this.indicadorResponse = response;
      this.cantidadVendida = this.indicadorResponse.datos.result[0].cantidadVendida
      this.totalVenta = this.indicadorResponse.datos.result[0].totalVenta
      this.totalUtilidad = this.indicadorResponse.datos.result[0].totalUtilidad
      this.totalCosto = this.indicadorResponse.datos.result[0].totalCosto
      this.porcentajeAvance = this.indicadorResponse.datos.result[0].porcetajeAvance
      this.totalGasto = this.indicadorResponse.datos.result[0].totalGasto
    })
  }

  listarProducto(descripcion:string){
    const requestProducto: productorequest = <productorequest>{}
    requestProducto.CodigoEmpresa = this.storage.get("codcompania").toString()
    requestProducto.CodigoProducto = '0'
    requestProducto.Descripcion= descripcion
    requestProducto.Color = '%'
    requestProducto.Talla = '%'
    requestProducto.Tipo_Prenda = 0
    requestProducto.Genero = '%'
    requestProducto.Estado= 'A'

    this.productoService.listar(requestProducto).subscribe(response =>{
      this.productoResponse = response
      if(this.arrayProducto.length <= 0){
        for(let i = 0; i<this.productoResponse.datos.result.length; i++){
          this.arrayProducto.push(this.productoResponse.datos.result[i].descripcion)
        }
      }else{
        this.codigoProducto = this.productoResponse.datos.result[0].codigoProducto
      }
      console.log(this.codigoProducto)
    })
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    this.listarProducto(selectedValue);
  }

  // events,
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
