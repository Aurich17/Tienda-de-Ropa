import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, SimpleChanges, VERSION, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { AperturaParteEmpleado, AperturaParteEstacion, RequestParte } from 'src/app/aperturaparte/domain/parte-entity';
import { ActividadResponse, EmpleadoResponse, EstacionResponse } from 'src/app/aperturaparte/domain/parte-respuesta';
import { AperturaparteRepository } from 'src/app/aperturaparte/domain/parte.repository';

import { RequestInformeTrazabilidad } from 'src/app/informetrazabilidad/domain/informetrazabilidad-entity';
import { InformeTrazabilidadList, InformeTrazabilidadResponse } from 'src/app/informetrazabilidad/domain/informetrazabilidad-response';
import { InformeTrazabilidadRepository } from 'src/app/informetrazabilidad/domain/informetrazabilidad.repository';
import { KeyPadButton } from 'src/app/interfaces/keypad-button.interface';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { UtilService } from 'src/app/services/util.service';

import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-informetrazabilidad',
  templateUrl: './informetrazabilidad.component.html',
  styleUrls: ['./informetrazabilidad.component.css']
})
export class InformetrazabilidadComponent implements OnInit {

  @ViewChild(MatPaginator) matPaginator: MatPaginator
  
 // @Input()listParte: ParteEntity[]
  @Input()listInformeRespuesta: InformeTrazabilidadResponse;
  @Input()listEmpleadoResponse: EmpleadoResponse;
  @Input()listEstacionResponse: EstacionResponse;

 // listupdateParterespuesta: ParteUpdateResponse;
  
  //@Output() outputParte:EventEmitter<ParteEntity>= new EventEmitter<ParteEntity>();

  group: FormGroup;
  qrData = null;
  scannedCode = null;
  collapsed: boolean;
  ngVersion = VERSION.full;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  path : string ;
  statusButton:string = "false";
  cantidadApoyo: number ;
  codigoEmpleado:number;
  codigoEstacion: string ;

 
  constructor(private barcodeScanner: BarcodeScanner,
    private readonly router:Router,
    private dialogo: MatDialog,
    private readonly util: UtilService,
    private readonly notifier : MatSnackBar,
    private readonly aperturaService : AperturaparteRepository,
    private readonly informarparteservice : InformeTrazabilidadRepository,
    private miDatePipe: DatePipe
    
    ) { 

    }

   
    
  ngOnChanges(changes: SimpleChanges) {
   // if (changes.firstChange){
        console.log(changes);
        //this.dataTable = this.listParte; // comentado para probar el insert
        //this.dataTable  = changes["listParte"].currentValue;
       // this.dataTable = changes.listParte.currentValue;
      //this.dataTable =  changes.listParterespuesta.currentValue;

     //this.dataTable = this.listParterespuesta.datos.result;
   // }
  }


 


  ngOnInit(): void {

    this.initializeForm();
    this.path="/gestionpartes";
    //this.dataTable = this.listParterespuesta;
   this.cantidadApoyo = 0;
   this.codigoEmpleado = 0;
   //this.dataTable =  this.listParterespuesta.datos.result;
   this.showSearch()

   this.group.controls['fechadesde'].setValue(this.miDatePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss"))
   this.group.controls['fechahasta'].setValue(this.miDatePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss"))
  }

  execute (action:string){

    if (action=="insert"){
      console.log(action);
     // this.insert();
    }else {
    console.log(action);
    this.exportar();
  }
  }

 
  Salir(path:string): void {
      this.router.navigate([this.path]);
  }

  @ViewChild('empleado') empleado: ElementRef;
  showSearch(){
   // this.show = !this.show;  
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.empleado.nativeElement.focus();
    },0);  
  }

  private handleKeyDown(event: any,tipo:string)
{
    if (event.keyCode == 13)
    {

      if (tipo==="empleado"){
      
        this.listarEmpleado("1") 
           
    }else if (tipo==="estacion"){
      
        this.listarEstacion("")
    
    }else if (tipo==="ot"){

      //this.listarOT()
    }

    }
    else if (event.keyCode == 40)
    {
        // action
    }  
    else if (event.keyCode == 38)
    {
        // action
    }    
}



  @ViewChild('estacion') estacion: ElementRef;
  @ViewChild('ot') ot: ElementRef;


  cambiarfocus(tipo:string){

  }


  limpiartexto(control:string ){

    if (control==='Empleado'){
    this.group.controls['codigoEmpleado'].setValue('')
    this.codigoEmpleado = 0
    }else if (control==='Estacion'){
      this.group.controls['codigoEstacion'].setValue('')
      this.codigoEstacion = ''
    
    }else if (control==="OT"){
      
      this.group.controls['codigoOrdenTrabajo'].setValue('')
      
    }

  }


  
  

      listarEmpleado(codigoEmpleado:string){

        const RequestEmpleado: AperturaParteEmpleado = <AperturaParteEmpleado>{}; 
        const values = this.group.value
        RequestEmpleado.codigoCompañia ='02100000'
        RequestEmpleado.codigoEmpleado=  values["codigoEmpleado"];
        if  (this.group.controls['codigoEmpleado'].valid){

              this.aperturaService.listarempleado(RequestEmpleado).subscribe
              ((response) =>{
                  this.listEmpleadoResponse = response
                  this.codigoEmpleado= this.listEmpleadoResponse.datos.result[0].codigoEmpleado; 
                  this.group.controls['codigoEmpleado'].setValue(this.listEmpleadoResponse.datos.result[0].codigoEmpleado && ' - ' && this.listEmpleadoResponse.datos.result[0].nombreCompleto );
              if (this.listEmpleadoResponse.datos.status!=200){
                  this.util.showMessage(this.listEmpleadoResponse.meta.mensaje)
              }
          }, (errorServicio)=>{
            this.util.showMessage( errorServicio.error.meta.mensaje);
            this.group.controls['codigoEmpleado'].setValue("");
            //this.dataTable = [];
        });
        

        }
    
  }


  listarEstacion(codigoEstacion:string){

    const RequestEstacion: AperturaParteEstacion = <AperturaParteEstacion>{}; ;
    const values = this.group.value
   
    RequestEstacion.CodigoEstacion=  values["codigoEstacion"];
    if (this.group.controls['codigoEstacion'].valid){
        this.aperturaService.listarestacion(RequestEstacion).subscribe
        ((response) =>{

        
            this.listEstacionResponse = response
            this.codigoEstacion= this.listEstacionResponse.datos.result[0].codigoEstacion;
            this.group.controls['codigoEstacion'].setValue(this.listEstacionResponse.datos.result[0].codigoEstacion && ' - ' && this.listEstacionResponse.datos.result[0].descripcion );
          
            setTimeout(()=>{ // this will make the execution after the above boolean has changed
              this.ot.nativeElement.focus();
              },0); 
          
            if (this.listEstacionResponse.datos.status!=200){
              this.util.showMessage(this.listEstacionResponse.meta.mensaje)
              }
          
            }, (errorServicio)=>{
              this.util.showMessage( errorServicio.error.meta.mensaje);
              this.group.controls['codigoEstacion'].setValue("");
              //this.dataTable = [];
      });
   
    //const fd= new FormData();
   }
  }

  //parteresponse : ParteResponse;

  listar (id: number){

      const fd= new FormData();
      const values = this.group.value
  
      const RequestInforme : RequestInformeTrazabilidad = <RequestInformeTrazabilidad>{} //  this.group.value;

      RequestInforme.CodigoCompañia='02100000'
      RequestInforme.CodigoEmpleado= this.codigoEmpleado
      RequestInforme.CodigoEstacion = this.codigoEstacion
      RequestInforme.CodigoOrdenTrabajo = values['codigoOrdenTrabajo']
      RequestInforme.EstadoParte=null
      RequestInforme.FechaInicio=this.miDatePipe.transform(values['fechadesde'], "yyyy-MM-ddTHH:mm:ss"); 
      RequestInforme.FechaFin=this.miDatePipe.transform(values['fechahasta'], "yyyy-MM-ddTHH:mm:ss");  
      
      this.dataTable=[]
  
     this.informarparteservice.ListarTrazabilidad(RequestInforme).subscribe(response => 
      {
        
        this.listInformeRespuesta = response
        this.dataTable = this.listInformeRespuesta.datos.result;

        this.sortedData = this.dataTable.slice();
      
    }, (errorServicio)=>{
      this.util.showMessage( errorServicio.error.meta.mensaje);
      
      });
  }
  
  listaApertura: any[] = [];
  dataTable :  InformeTrazabilidadList[]



  sortedData: InformeTrazabilidadList[];

 
    
  

  sortData(sort: Sort) {
    const data = this.dataTable.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.nombreEmpleado, b.nombreEmpleado, isAsc);
       /* case 'calories':
          return compare(a.calories, b.calories, isAsc);
        case 'fat':
          return compare(a.fat, b.fat, isAsc);
        case 'carbs':
          return compare(a.carbs, b.carbs, isAsc);
        case 'protein':
          return compare(a.protein, b.protein, isAsc);
          */
        default:
          return 0;
      }
    });
  }





 edit (){

     this.openModal({name: 'Marcela'})

 }

 nuevo (){

    this.initializeForm();
    this.listaApertura=[]
    this.dataTable = this.listaApertura;

 }


 exportar (){

  this.OpenSheet();
}

OpenSheet(){
    this.util.openSheet();
}

initializeForm(){
  this.group = new FormGroup({
  codigoEmpleado : new FormControl (null),
  codigoEstacion: new FormControl(null),
  codigoOrdenTrabajo: new FormControl(null),
  fechadesde :new FormControl(null),
  fechahasta:new FormControl(null),
 });
 }

openModal(record : any =  null){
/*
  const options = {
       
    disableClose: true,
    panelClass:'container-form',
    data: record,
  };

  const reference =  this.util.openModal(
    FormModificarPartComponent,
      options
    );
    reference.subscribe((responses) => {

      if (responses.codigoParte){

             responses.fechaHoraActualizacion = this.miDatePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss");
      
            this.modificarparteservice.update(responses).subscribe((response) =>{
            this.listupdateParterespuesta = response
            this.util.showMessage(this.listupdateParterespuesta.meta.mensaje);
            if (this.listupdateParterespuesta.datos.status===200){

            if (this.listupdateParterespuesta.meta.mensaje!="Parte existe"){
              this.listar(this.listupdateParterespuesta.datos.result.codigoParte)
            }
            }

            }, (errorServicio)=>{
            this.util.showMessage( errorServicio.error.meta.mensaje);
            //this.dataTable = [];
            });


        this.util.showMessage("Datos guardados");
       }

    });

    */
}
  
  listKeyPadButtons: KeyPadButton[] = [
    
    {icon:'description',color:'warn',action:'nuevo',tooltip:'Crear Nuevo Registro',texto : "Nuevo",estado:"false"},
    {icon:'add',color:'warn',action:'insert',tooltip:'Agregar Datos',texto:"Agregar",estado: "group.invalid"},
    {icon:'sensor_door',color:'warn',action:'salir',tooltip:'Salir De la Pantalla',texto:"Salir",estado:"false"}
  ];
  

  metadataTable: MetadataTable[] = [
    
    {field:"codigoEmpleado",title: "Cod.Empleado"} ,
    {field:"nombreEmpleado",title: "Empleado"} ,
    {field:"codigoEstacion", title: "CodigoEstacion"},
    //{field:"nombreEstacion", title: "Estacion"},
    {field:"codigoOrdenTrabajo", title: "Orden Trabajo"},
    //{field:"c_item", title : "Componente"},
   // {field:"c_descripcion", title : "descripcion"},
    {field:"numeroParteProduccion", title: "Parte Producion"},
    {field:"cantidadApoyo", title: "Cant. Apoyo"},
    {field:"secuencia", title: "Secuencia"},
    {field:"cantidad", title: "Cant."},
    {field:"nombreEstadoParteActividad", title: "Estado Actividad"},
    {field:"fechaHoraInicioActividad", title: "Inicio Actividad"},
    {field:"fechaHoraTerminoActividad", title: "Fin Actividad"},
    {field:"tiempoTranscurrido", title: "Tiempo"},
    {field:"tipotiempo", title: "Actividad"},
    {field:"cantfilas", title: "   Cant.Filas"},
  
  ];

  
  



   
}




function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}