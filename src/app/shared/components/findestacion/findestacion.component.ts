
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { KeyPadButton } from 'src/app/interfaces/keypad-button.interface';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { UtilService } from 'src/app/services/util.service';
import { DialogoConfirmacionComponent } from '../dialogoconfirmacion/dialogoconfirmacion.component';
import { Observable } from 'rxjs/dist/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, SimpleChanges } from '@angular/core';




@Component({
  selector: 'app-pruebadecomponente',
  templateUrl: './pruebadecomponente.component.html',
  styleUrls: ['./pruebadecomponente.component.css']
})

@Component({
  selector: 'app-findestacion',
  templateUrl: './findestacion.component.html',
  styleUrls: ['./findestacion.component.css']
})
export class FindestacionComponent implements OnInit {

  //@Input()listParte: ParteEntity[]
  //@Input()listCMrespuesta: CapacidadMaquinaResponse;
  //@Input()listCMInsertrespuesta: CapacidadMaquinaResponse;
  //@Input()entidadcapacidaM: CapacidadMaquinaEntity;
  
 // @Input()listInsertParterespuesta: ParteInsertResponse;
 // @Input()listEmpleadoResponse: EmpleadoResponse;
  //@Input()listEstacionResponse: EstacionResponse;
  
 
// @Output() onEdit :EventEmitter<CapacidadMaquinaEntity>= new EventEmitter<CapacidadMaquinaEntity>();

  group: any = null;
  qrData = null;
  scannedCode = null;
  collapsed: boolean =  false;
  hasCameras = false;
  hasPermission: boolean = false;
  qrResultString: string = '';
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: any// MediaDeviceInfo ;
  path : string  = '';
  statusButton:string = "false";
  cantidadApoyo: number = 0  ;
  codigoEmpleado:number = 0 ;
  codigoEstacion: string = '' ;
  codigoParte:string = '';
  listaApertura: any[] = [];
  dataTable :  [] = []

 
  constructor(
    private readonly router:Router,
    private dialogo: MatDialog,
    private readonly util: UtilService,
    private readonly notifier : MatSnackBar,
    //private readonly CapacidadMaquinaService : CapacidadMaquinaRepository,
    //private miDatePipe: DatePipe
    ) { }

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
  }

  execute (action:string){


  }

  Salir(path:string): void {

      this.router.navigate([this.path]);
   
  }

   //RequestEmpleado : AperturaParteEmpleado;

  listarEmpleado(codigoEmpleado:string){

  }

  listarEstacion(codigoEstacion:string){

  }

  listar (codigoparte: number){
/*
   
    this.dataTable = [];
     
      const fd= new FormData();
      const values = this.group.value
      const parte: RequestCapacidadMaquina =  this.group.value;
      this.codigoEstacion= values['CodigoEstacion']
      parte.CodigoEstacion = this.codigoEstacion;
      parte.CodigoCompañia="02100000"
     this.CapacidadMaquinaService.listar(parte).subscribe(response => 
      {
        this.listCMrespuesta = response
        this.dataTable = this.listCMrespuesta.datos.result;
      }, (errorServicio)=>{
          this.util.showMessage( errorServicio.error.meta.mensaje);
          this.dataTable = [];
       });


       */

  }
 
   

  delete (){
    const response: Observable<any> = this.util.confirm("Estas seguro de Eliminar");
    response.subscribe((response)=> console.log("response",response));
 }


 /*edit (row : CapacidadMaquinaEntity){

     this.onEdit.emit(row)
     this.openModal(row)

 }*/

 nuevo (){

   // this.initializeForm();
   //this.listaApertura=[]
   // this.dataTable = this.listaApertura;

    this.openModal({name: 'Marcela'})

 }

 
 cargarDatos(){

  this.group = new FormGroup({
    codigoEmpleado : new FormControl (this.listaApertura[0].codigoEmpleado,Validators.required),
    codigoEstacion: new FormControl(this.listaApertura[0].codigoEstacion,Validators.required),
    codigoOrdenTrabajo: new FormControl(this.listaApertura[0].codigoOrdenTrabajo,Validators.required),
    
   });

 }

 exportar (){

  this.OpenSheet();
}

OpenSheet(){
    this.util.openSheet();
}

initializeForm(){
  this.group = new FormGroup({
    codigoEstacion : new FormControl (null),
    descripcion : new FormControl(null),
 });
 }

openModal(record : any =  null){

  /*const options = {
       
    disableClose: true,
    panelClass:'container-form',
    data: record,
  };

  const reference =  this.util.openModal(
    FormcapacidadmaquinaComponent,
    options
     
    );
    reference.subscribe((respuesta) => {
      if (respuesta){
       
       if (!respuesta.codigoCapacidadMaquina){
            this.CapacidadMaquinaService.insert(respuesta).subscribe(response => 
              {
                //this.listCMInsertrespuesta = response
                //this.dataTable = this.listCMrespuesta.datos.result;
              }, (errorServicio)=>{
                  this.util.showMessage( errorServicio.error.meta.mensaje);
                  this.dataTable = [];
              });
         }else {
          
          this.CapacidadMaquinaService.update(respuesta,respuesta.codigoCapacidadMaquina).subscribe(response => 
            {
              //this.listCMInsertrespuesta = response
              //this.dataTable = this.listCMrespuesta.datos.result;
            }, (errorServicio)=>{
                this.util.showMessage( errorServicio.error.meta.mensaje);
                this.dataTable = [];
            });

         }

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
    {field:"codigoEstacion",title: "Cod. Estacion"},
    //{field:"codigoCompañia", title: "Codigo"},
    {field:"nombreEstacion", title: "Estacion"},
   // {field:"codigoEmpleado", title: "Codigo"},
    {field:"unidadMedida", title: "Unidad Medida"},
    //{field:"codigoEstacion", title: "Codigo"},
    {field:"productividad1", title: "Productividad 1"},
    {field:"productividad2", title: "Productividad 2"},
    {field:"productividad3", title: "Productividad 3"},
    {field:"tiempoPreparacion", title: "Tiempo Preparacion"},
    {field:"cantidadPersonas", title: "Cantidad Personas"},
  
  ];

  
  scanCode () {
   // this.barcodeScanner.scan().then(barcodeData => {
    //  this.scannedCode = barcodeData.text;
    //})
    this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `¿Desea Agregar personal de Apoyo?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        alert("¡A mí también!");
        //this.edit();
        
      } else {
        alert("Deberías probarlo, a mí me gusta :)");
      }
    });

    //alert("camara");
   

   
  }

   

    

   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

   
}








