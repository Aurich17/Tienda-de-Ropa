import { ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, FormGroup, Validators } from '@angular/forms';
import { VERSION } from '@angular/platform-browser';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
//import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { Router, Routes } from '@angular/router';
import { KeyPadButton } from 'src/app/interfaces/keypad-button.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/shared/components/dialogoconfirmacion/dialogoconfirmacion.component';
import { UtilService } from 'src/app/services/util.service';
import { FormAperturaparteComponent } from '../form-aperturaparte/form-aperturaparte.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ActividadEntity, AperturaParteEmpleado, AperturaParteEstacion, AperturaParteTransaccion, EmpleadoLista, parteActividades, ParteEntity, ParteUpdateEntity, RequestOT, RequestParte, RequestParteActividadList, RequestValidarParte } from 'src/app/aperturaparte/domain/parte-entity';

import { AperturaparteRepository } from 'src/app/aperturaparte/domain/parte.repository';
import { ActividadResponse, EmpleadoResponse, EstacionResponse, OrdentrabajoResponse, ParteInsertResponse, ParteResponse, Resultado, ValidarParteResponse } from 'src/app/aperturaparte/domain/parte-respuesta';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { MatSelect } from '@angular/material/select';




@Component({
  selector: 'app-aperturaparte',
  templateUrl: './aperturaparte.component.html',
  styleUrls: ['./aperturaparte.component.css']
})
export class AperturaparteComponent implements OnInit, OnChanges {

  @Input()listParte: ParteEntity[]
  @Input()listParterespuesta: ParteResponse;
  @Input()listInsertParterespuesta: ParteInsertResponse;
  @Input()RespuestaValidarParte: ValidarParteResponse;
  @Input()listEmpleadoResponse: EmpleadoResponse;
  @Input()listEstacionResponse: EstacionResponse;

  @Input()listParteAxtividad: ActividadResponse;

  listOTResponse : OrdentrabajoResponse;

  listaparteactividad : ActividadEntity;
   
  @Output() outputParte:EventEmitter<ParteEntity>= new EventEmitter<ParteEntity>();

  group: FormGroup;
  qrData = null;
  scannedCode = null;
  collapsed: boolean;
  ngVersion = VERSION.full;
  @ViewChild('scanner')
 // scanner: ZXingScannerComponent;
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
  codigoParte:number ;
  Accion : string;
 checkstatus : boolean
  tituloboton:string;
habilitar : string 
  checked:boolean;
  habilitarbotonguardar:boolean
  numeroParteProduccion:number
  GfechaHoraInicioOt:string
  isEnvioSolicitud : boolean

  constructor(//private barcodeScanner: BarcodeScanner,
    private readonly router:Router,
    private dialogo: MatDialog,
    private readonly util: UtilService,
    private readonly notifier : MatSnackBar,
    private readonly aperturaService : AperturaparteRepository,
    private miDatePipe: DatePipe,
    private readonly storage :StorageService,

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

  ispasarstockfaltante : boolean

  @ViewChild('searchElement') searchElement: ElementRef;

  @ViewChild(MatSelect) turnos: MatSelect;

  
  showSearch(){
   // this.show = !this.show;  
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    },0);  
  }

  @ViewChild('estacion') estacion: ElementRef;

  @ViewChild('guardar') guardar: ElementRef;
  cambiarfocus(tipo:string){
/*
    if (tipo==="empleado"){
     const pasarsize =  this.validarcodigoempleado(this.group.controls['codigoEmpleado'].value)
      if  ((this.group.controls['codigoEmpleado'].value.length>4) || (pasarsize ===true)){
        if  (this.listarEmpleado("1") ===true){
          setTimeout(()=>{ // this will make the execution after the above boolean has changed
            this.estacion.nativeElement.focus();
            },0);  
        }
      
    }
   }else if (tipo==="estacion"){
    if  (this.group.controls['codigoEstacion'].value.length>5){
      this.listarEstacion("")
    }

   }else if (tipo==="ot"){

    if  (this.group.controls['codigoOrdenTrabajo'].value.length>6){
      this.listarOT()

    }

   }

   */
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

      this.listarOT()
    }else if (tipo==="secuencia"){

      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.turnos.focus ();
      },0);  
    }else if (tipo==="guardar"){

      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.guardar.nativeElement.focus ();
      },0); 
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


  @ViewChild('ot') ot: ElementRef;
  @ViewChild('secuencia') secuencia: ElementRef;
  ngOnInit(): void {

    this.initializeForm();
    this.path="/gestionpartes";
    //this.dataTable = this.listParterespuesta;
   this.cantidadApoyo = 0;
   this.codigoEmpleado = 0;
   this.Accion ="nuevo"
   this.tituloboton = "Guardar"

   this.codigoEstacion = '';

   this.checkstatus= false ;

   this.listaEmpleado =[]

   this.checked= false 
   this.showSearch()

   this.habilitar="disabled"

   this.isEnvioSolicitud = false
     

   


   //this.habilitarbotonguardar="disabled"

   this.ispasarstockfaltante = false

   const codigorol =this.storage.get("rol").toString()

   //if (this.validarroles(codigorol)){
    if (1==1){
    this.ispasarstockfaltante = true

    
   }

/*
   let cardNum = this.group.get('codigoEmpleado').value;
   //if (cardNum == null || cardNum == '') {
     (<any>this.group.get('codigoEmpleado')).nativeElement.focus();
   //}
*/
   //this.dataTable =  this.listParterespuesta.datos.result;
  }


  turno: turno[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
  
  ];


  motivo: motivo[] = [
    {value: '1', viewValue: 'motivo 1'},
    {value: '2', viewValue: 'motivo 2 '},
    {value: '3', viewValue: 'motivo 3'},
  
  ];



  validarcodigoempleado(dato : string):boolean{
     
    var myArr = ["5","6","12","13","17","23","24","29","31","32","33","35","49","54","55","64"
    ,"67","68","76","82","86","89","91","176","257","299","303","305","384","5174","5192"]

    const resultado =  myArr.includes( dato ) 
    
    return resultado

  }

  validarroles(dato : string):boolean{
     
    var myArr = ["1","2","3","5"]

    const resultado =  myArr.includes( dato ) 
    return resultado

  }

  execute (action:string){

    if (action=="insert"){
      console.log(action);
      this.insert();
    }else {
    console.log(action);
    this.exportar();
  }
  }

  Salir(path:string): void {
      this.router.navigate([this.path]);
  }

  limpiartexto(control:string ){

    if (control==='Empleado'){
    this.group.controls['codigoEmpleado'].setValue('')
    this.codigoEmpleado = 0
    this.habilitar="disabled"
    }else if (control==='Estacion'){
      this.group.controls['codigoEstacion'].setValue('')
      this.codigoEstacion = ''
    
    }else if (control==="OT"){
      
      this.group.controls['codigoOrdenTrabajo'].setValue('')
      
    }

  }

listarOT (){

  const RequestOT:  RequestOT = <RequestOT>{}; 
  const values = this.group.value
  RequestOT.CodigoCompañia ='02100000'
  RequestOT.CodigoOrdenTrabajo= values["codigoOrdenTrabajo"];
  if  (this.group.controls['codigoOrdenTrabajo'].valid){


        this.aperturaService.listarot(RequestOT).subscribe
        ((response) =>{
            this.listOTResponse = response
            //this.codigoEmpleado= this.listEmpleadoResponse.datos.result[0].codigoEmpleado; 
            //this.group.controls['codigoEmpleado'].setValue(this.listEmpleadoResponse.datos.result[0].codigoEmpleado && ' - ' && this.listEmpleadoResponse.datos.result[0].nombreCompleto );
            setTimeout(()=>{ // this will make the execution after the above boolean has changed
              this.secuencia.nativeElement.focus();
              },0); 

            if (this.listEmpleadoResponse.datos.status!=200){
            this.util.showMessage(this.listEmpleadoResponse.meta.mensaje)
        }else{

          if (this.listOTResponse.datos.TotalRegistro<=0 ){
           this.group.controls['codigoOrdenTrabajo'].setValue("");
           this.util.showMessage(this.listEmpleadoResponse.meta.mensaje)
          }
        }
      
    }, (errorServicio)=>{
      this.util.showMessage( errorServicio.error.meta.mensaje);
      this.group.controls['codigoOrdenTrabajo'].setValue("");
      //this.dataTable = [];
  });
  
  }

}
AsignarReproceso(){

  const values = this.group.value
  //if  (this.codigoEstacion === ''){
      //alert(values["reproceso"])
  //}

  if (values["reproceso"] ===false){
  this.group.controls['secuencia'].setValue("99");
  }else if (values["reproceso"] ===null){

    this.group.controls['secuencia'].setValue("99");
  }
  else 
  {
    this.group.controls['secuencia'].setValue("");

  }

}

   //RequestEmpleado : AperturaParteEmpleado;
    isvalido : boolean
    listarEmpleado(codigoEmpleado:string):boolean{
         this.isvalido = false;
        
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
                  this.isvalido= true 
                  setTimeout(()=>{ // this will make the execution after the above boolean has changed
                    this.estacion.nativeElement.focus();
                  },0); 
                  this.habilitar="null"
                  return this.isvalido

                  if (this.listEmpleadoResponse.datos.status!=200){
                  this.util.showMessage(this.listEmpleadoResponse.meta.mensaje)
              }else{

                /*
                this.dialogo
                .open(DialogoConfirmacionComponent, {
                  data: `¿Desea agregar personal de Apoyo?`
                })
                .afterClosed()
                .subscribe((confirmado: Boolean) => {
                  if (confirmado) {
                    //alert("¡A mí también!");
                    this.edit();
                    
                  } else {
                   // alert("Deberías probarlo, a mí me gusta :)");
                  }
                });
*/

              }
          }, (errorServicio)=>{
            this.util.showMessage( errorServicio.error.meta.mensaje);
            this.group.controls['codigoEmpleado'].setValue("");
            //this.dataTable = [];
        });
        

        }

        return  this.isvalido
    
  }

  personalapoyo(){


   /* this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `¿Desea agregar personal de Apoyo?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        //alert("¡A mí también!");
        this.edit();
        
      } else {
       // alert("Deberías probarlo, a mí me gusta :)");
      }
    });
*/

this.edit();

  }
  listarEstacion(codigoEstacion:string){

    const RequestEstacion: AperturaParteEstacion = <AperturaParteEstacion>{}; ;
    const values = this.group.value
   if  (this.codigoEstacion === ''){
     RequestEstacion.CodigoEstacion=values["codigoEstacion"];
   }else {
    RequestEstacion.CodigoEstacion=this.codigoEstacion
   }
    
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
  parteresponse : ParteResponse;

  listar (codigoparte: number){


    if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
    
      const parte: RequestParteActividadList =<RequestParteActividadList>{}//  this.group.value;
     
      parte.CodigoParte = codigoparte;
      parte.CodigoEmpleado =null 
     // parte.CodigoEstacion= null
     // parte.CodigoOrdenTrabajo = null 
     
     /*this.aperturaService.listar(parte).subscribe(response => 
  
      {
        this.listParterespuesta = response
        this.dataTable = this.listParterespuesta.datos.result;
      }
        )
      */

        this.aperturaService.listarParteActividad(parte).subscribe(response => 
  
          {
            this.listParteAxtividad = response
            this.dataTable = this.listParteAxtividad.datos.result;
          }
            )

  }
}

MensajeValidarParte:string

insertnew() {

 const values = this.group.value

 this.MensajeValidarParte = "" 
 const  partevalidar : RequestValidarParte = <RequestValidarParte>{}

 partevalidar.CodigoCompañia="02100000"
 partevalidar.CodigoOrdenTrabajo = values["codigoOrdenTrabajo"]
 partevalidar.Secuencia=values["secuencia"]

  this.aperturaService.ValidarParte(partevalidar).subscribe((response) =>{
    this.RespuestaValidarParte = response
   // this.util.showMessage(this.listInsertParterespuesta.meta.mensaje);
   // this.isEnvioSolicitud = false
   this.MensajeValidarParte= this.RespuestaValidarParte.meta.mensaje

   if (this.RespuestaValidarParte.meta.mensaje!="OK"){
      

 }
  
    if (this.RespuestaValidarParte.datos.status===200){
      this.MensajeValidarParte= this.RespuestaValidarParte.meta.mensaje

      this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: this.MensajeValidarParte + `   ¿Desea Continuar ?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        
        this.insert();
        //alert("Procesando")
        
      } else {

       // alert("Rechazado")
 
       // alert("Deberías probarlo, a mí me gusta :)");
      }
    });

    }

    }, (errorServicio)=>{
     //this.util.showMessage( errorServicio.error.meta.mensaje);
    this.insert();
    this.MensajeValidarParte=""
    });


    return this.MensajeValidarParte

}


  insert( ){

    if(this.isEnvioSolicitud == false ) {
          if (this.group.valid){
            const fd= new FormData();
                      const values = this.group.value
                 //     this.v_validarparte = this.validarparte (parseInt(values["secuencia"]),values["codigoOrdenTrabajo"])
           
          //if ( this.v_validarparte==true) {
              
                  this.isEnvioSolicitud = true
                 
                  if((parseInt(values["secuencia"] ) <= 0 ) || (parseInt(values["secuencia"]  ) > 99))  {

                      this.util.showMessage("Secuencia no puede ser 0 o menor")

                  }else {

                  fd.append("codigoCompania",'02100000');
                  fd.append("codigoEmpleado",this.codigoEmpleado.toString());
                  fd.append("codigoEstacion",this.codigoEstacion);
                  fd.append ("codigoOrdenTrabajo" , values["codigoOrdenTrabajo"]);
                  fd.append("cantidadApoyo", this.cantidadApoyo.toString());
                  fd.append("fechaHoraInicioOt",this.miDatePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss"));//"2021-06-14T10:31:14.507");
              
                  fd.append("fechaHoraTerminoOt",null);
                  const parte: AperturaParteTransaccion = <AperturaParteTransaccion>{};  
                  parte.codigoCompañia = fd.get("codigoCompania").toString() ;
                  parte.codigoEstacion= fd.get("codigoEstacion").toString() ;
                  parte.codigoOrdenTrabajo = parseInt(fd.get("codigoOrdenTrabajo").toString()) ;
                  parte.cantidadApoyo= parseInt(fd.get("cantidadApoyo").toString()) ;

                  
                  parte.fechaHoraTerminoOt = null
                  parte.Turno = values["turno"]
                  


                  if (values["pasarsinstock"] ===null){

                    parte.PasarStock = "N"//values["pasarstock"] //"N"

                  }else if (values["pasarsinstock"] ===true){

                    parte.PasarStock = "S"

                  }else{
                    parte.PasarStock = "N"

                  }

                  if (values["reproceso"] ===null){
                    parte.Reproceso ="N"
                  }else if (values["reproceso"] ===true) {
                    parte.Reproceso ="S"
                  }else {
                    parte.Reproceso ="N"
                  }
                  
                
                  parte.CodigoMotivoParte=0
                    parte.CodigoMotivoRechazo1= ""
                    parte.CantidadRechazada1= 0
                    parte.CodigoMotivoRechazo2 = ""
                    parte.CantidadRechazada2= 0
                    parte.CodigoMotivoRechazo3= ""
                    parte.CantidadRechazada3 = 0 
                    parte.cantidad = 0
                    parte.filas = 0 
                    parte.secuencia =parseInt(values["secuencia"] )
                    parte.EstadoParte = "A"
                    parte.EstadoRegistro= true 
                    parte.Usuario = this.codigoEmpleado.toString()//this.storage.get("codusuario")
                  
                    const fechahoraregistro:string  = this.miDatePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss");
                  
                  parte.FlagTiempoPreparacion= values["tiempopreparacion"]
                    parte.parteActividades = []

                    if  (this.Accion ==="nuevo"){
                
                    parte.fechaHoraInicioOt= fd.get("fechaHoraInicioOt").toString() ;
                    parte.NumeroParteProduccion = 0  
                    parte.Accion = "I"     
                  
                    if (this.listaEmpleado.length>0 ){

                          for (var x in this.listaEmpleado) {
                            const ActParte: parteActividades = <parteActividades>{}
                            ActParte.CodigoParteActividad = 0 
                            ActParte.codigoEmpleado = this.listaEmpleado[x].codigoEmpleado ;
                            ActParte.fechaHoraTerminoActividad = null

                            if (values["tiempopreparacion"] ===true){

                              ActParte.fechaHoraInicioActividad= null 
                  
                            }else {ActParte.fechaHoraInicioActividad = fechahoraregistro ;}

                          
                            //parte.parteActividades = [];
                            parte.parteActividades.push(ActParte);
                          }

                      }
                            const ActParte: parteActividades = <parteActividades>{}
                            ActParte.CodigoParteActividad = 0 
                            if (values["tiempopreparacion"] ===true){
                              ActParte.fechaHoraInicioActividad=null
                            }else { 
                              ActParte.fechaHoraInicioActividad = this.miDatePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss");
                            }

                            ActParte.codigoEmpleado = this.codigoEmpleado ;
                            ActParte.fechaHoraTerminoActividad = null
                            
                            parte.parteActividades.push(ActParte);
                            //////////////////////////////////////////

                    }else {

                      parte.NumeroParteProduccion= this.numeroParteProduccion
                      parte.Accion = 'U'
                      parte.CodigoParte = this.codigoParte
                      parte.fechaHoraInicioOt = this.GfechaHoraInicioOt
                    }
                  //if  (this.Accion ==="nuevo"){
                        this.aperturaService.insert(parte).subscribe((response) =>{
                        this.listInsertParterespuesta = response
                        this.util.showMessage(this.listInsertParterespuesta.meta.mensaje);
                        this.isEnvioSolicitud = false
                      
                        if (this.listInsertParterespuesta.datos.status===200){
                          if (values["tiempopreparacion"] ===true){
                              this.insertTiempoPreparacion(parte.Accion,response.datos.n_parteproduccion,response.datos.codigoParte)
                          }
                      // if (this.listInsertParterespuesta.meta.mensaje!="Parte existe"){
                          this.listar(this.listInsertParterespuesta.datos.codigoParte)
                          this.limpiarControles()
                          this.listaEmpleado = []
                          this.isEnvioSolicitud = false
                      // }
                        }

                        }, (errorServicio)=>{
                        this.util.showMessage( errorServicio.error.meta.mensaje);
                        
                        this.isEnvioSolicitud = false
                        //this.dataTable = [];
                        });
     
              }
         // }//fin de validar parte
        }
      }else{

        alert('ya se envio una solicitud al servidor espere porfavor.')
      }
  }



  limpiarControles (){


    this.group.controls['codigoEmpleado'].setValue('')
    this.codigoEmpleado= -1
    this.group.controls['codigoEstacion'].setValue('')
    this.codigoEstacion= ''

    this.group.controls['codigoOrdenTrabajo'].setValue('')

    this.group.controls['turno'].setValue('1')
    this.group.controls['secuencia'].setValue('')
    this.group.controls['reproceso'].setValue(false)
    this.group.controls['pasarsinstock'].setValue(false)
    this.group.controls['tiempopreparacion'].setValue(false)
    this.listaEmpleado=[]


  }

  insertTiempoPreparacion(tipotransaccion:string ,numeroparteproduccion:number,CodigoParte : number ){

  /*  const requestInsertTM : TiempoPreparacionEntity=<TiempoPreparacionEntity>{}
    const value = this.group.value;
    requestInsertTM.CodigoCompañia= "02100000"
    requestInsertTM.CodigoEmpleado= this.codigoEmpleado
    requestInsertTM.CodigoEstacion=this.codigoEstacion 
    requestInsertTM.NumeroParteProduccion = numeroparteproduccion
    requestInsertTM.CodigoParte = CodigoParte
    //requestInsertTM.CodigoMotivoTiempoMuerto =value["codigoMotivo"]
    if (value["codigoOrdenTrabajo"] ===null){

     requestInsertTM.CodigoOrdenTrabajo = 0

    }else{
       requestInsertTM.CodigoOrdenTrabajo = value["codigoOrdenTrabajo"]
    }
   
    requestInsertTM.Secuencia =  value["secuencia"]

    requestInsertTM.Usuario=this.codigoEmpleado.toString()//this.storage.get("codusuario")
    requestInsertTM.FechaHoraFinTiempoPreparacion= null
    //requestInsertTM.CodigoMotivoTiempoPreparacion= 1
    requestInsertTM.EstadoTiempoPreparacion= "P"
   
    requestInsertTM.EstadoRegistro=true

    if (tipotransaccion==="I"){

     requestInsertTM.Accion="I"
     requestInsertTM.FechaHoraInicioTiempoPreparacion = this.miDatePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss")
   
    }else
    {
     requestInsertTM.Accion="U"
     //requestInsertTM.FechaHoraInicioTiempoPreparacion = this.GFechaHoraInicioTiempoPreparacion
     //requestInsertTM.CodigoTiempoPreparacion=this.CodigoTiempoPreparacion

    }
     //this.TiempoPreperacionService.insert(requestInsertTM).subscribe(response => 
     {
       //this.listCMInsertrespuesta = response
       //this.dataTable = this.listCMrespuesta.datos.result;
       //this.util.showMessage( response.meta.mensaje);

       setTimeout(()=>{ // this will make the execution after the above boolean has changed
        
         },5000); 

        
        
      // this.listar(1);
     }, (errorServicio)=>{
         this.util.showMessage( errorServicio.error.meta.mensaje);
         this.dataTable = [];
     });
*/

}


  /*formatearFecha(fecha: string) {
    const fechaArray: any[] = fecha.split(/[\/\s\:]/g);

    // Pasamos fecha a milisegundos
    const milliseconds = Date.UTC(fechaArray[2], fechaArray[1] - 1,
      fechaArray[0], fechaArray[3], fechaArray[4], fechaArray[5]);

    const fechaFormateada = this.miDatePipe.transform(milliseconds, 'yyyy-MM-dd hh:mm:ss');

    return `${fechaFormateada} ${fecha.split(/[\s]/g)[1]}-00`;
  }

  */

  listaApertura: any[] = [];
  dataTable :  ActividadResponse[]


  delete (){
    const response: Observable<any> = this.util.confirm("Estas seguro de Eliminar");
    response.subscribe((response)=> console.log("response",response));
 }


 edit (){

     this.openModal({name: 'Marcela'})

 }

 nuevo (){

  this.limpiarControles()

    this.initializeForm();
    this.listaApertura=[]
    this.dataTable = this.listaApertura;
    this.tituloboton = "Guardar"
    this.Accion="nuevo"
    this.cantidadApoyo = 0;
    this.isEnvioSolicitud = false
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
      },0);

      this.listaEmpleado=[]

      this.habilitar="disabled"

 }

 
 cargarDatos(row:Resultado){

    this.group = new FormGroup({
    codigoEmpleado : new FormControl (row.nombreEmpleado,Validators.required),
    codigoEstacion: new FormControl(row.nombreEstacion,Validators.required),
    codigoOrdenTrabajo: new FormControl(row.codigoOrdenTrabajo,Validators.required),
    secuencia: new FormControl(row.secuencia,Validators.required),
    turno: new FormControl(row.turno,Validators.required)


   });

   this.codigoEmpleado = row.codigoEmpleado;
   this.codigoEstacion = row.codigoEstacion;
   this.cantidadApoyo = row.cantidadApoyo;
   this.codigoParte = row.codigoParte
   this.numeroParteProduccion= row.numeroParteProduccion;
   this.GfechaHoraInicioOt = row.fechaHoraInicioOT
   this.Accion ="editar"
   this.tituloboton = "Editar"

   this.listaparteactividad  = row.parteActividads[0]// <ActividadEntity>{};
   this.listaparteactividad.Cantidad=  row.parteActividads[0].Cantidad
   this.listaparteactividad.Secuencia=  row.parteActividads[0].Secuencia
   this.listaparteactividad.UsuarioCreacion=  row.parteActividads[0].UsuarioCreacion
   this.listaparteactividad.FechaHoraTerminoActividad=  null
   this.listaparteactividad.FechaHoraInicioActividad=  row.parteActividads[0].FechaHoraInicioActividad
   
 }

 exportar (){

  this.OpenSheet();

}

GetEmpleado():number{

  return this.codigoEmpleado

}

OpenSheet(){
    this.util.openSheet();
}

initializeForm(){
  this.group = new FormGroup({
  codigoEmpleado : new FormControl (null,Validators.required),
                                         // Validators.maxLength(10),
                                          //Validators.pattern(/^[1-9]\d{1,10}$/)]),
  codigoEstacion: new FormControl(null,Validators.required),
  codigoOrdenTrabajo: new FormControl(null,Validators.required),
  turno : new   FormControl("1",Validators.required),
  secuencia:  new FormControl(null,Validators.required),
  cantidadrechazado :new FormControl(null),
  motivo:new FormControl(null),
  reproceso : new FormControl(null),
  pasarsinstock: new FormControl(null),
  tiempopreparacion : new FormControl(false)

  
 });
 }

 listaEmpleado : EmpleadoLista[] ;
  
openModal(record : any =  null){

   record =  this.listaEmpleado
  //record = this.codigoEmpleado
  //this.cantidadApoyo = 0;

  const options = {
       
    disableClose: true,
    panelClass:'container-form',
    data: record,
  
  };

  const reference =  this.util.openModal(
      FormAperturaparteComponent,
      options,
    
    );
    reference.subscribe((response) => {

      if (response){
       this.cantidadApoyo = response.CantidadApoyo;
       this.listaEmpleado = response.listaEmpleado
      }
    });

}
  
  listKeyPadButtons: KeyPadButton[] = [
    
    {icon:'description',color:'warn',action:'nuevo',tooltip:'Crear Nuevo Registro',texto : "Nuevo",estado:"false"},
    {icon:'add',color:'warn',action:'insert',tooltip:'Agregar Datos',texto:"Agregar",estado: "group.invalid"},
    {icon:'sensor_door',color:'warn',action:'salir',tooltip:'Salir De la Pantalla',texto:"Salir",estado:"false"}
  ];
  

  metadataTable: MetadataTable[] = [
    {field:"codigoParte",title: "Parte"} ,
    //{field:"codigoCompañia", title: "Codigo"},
   // {field:"nombreCompañia", title: "Compañia"},
   // {field:"codigoEmpleado", title: "Codigo"},
    {field:"nombreEmpleado", title: "Empleado"},
    //{field:"codigoEstacion", title: "Codigo"},
    {field:"nombreEstacion", title: "Estacion"},
    {field:"codigoOrdenTrabajo", title: "Orden Trabajo"},
    {field:"numeroParteProduccion", title: "Parte Prod."},
    {field:"secuencia", title: "Secuencia"},
    {field:"cantidadApoyo", title: "Cant. Apoyo"},

    
    
    
  ];

 

  
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface turno {
  value: string;
  viewValue: string;
}


export interface motivo {
  value: string;
  viewValue: string;
}




