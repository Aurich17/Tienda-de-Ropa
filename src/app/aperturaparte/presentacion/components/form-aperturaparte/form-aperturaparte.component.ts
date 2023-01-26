
import { Component, ElementRef, EventEmitter, Inject, Injectable, Input, OnInit, Output, SimpleChanges, VERSION, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoLista } from 'src/app/aperturaparte/domain/parte-entity';
import { AperturaparteRepository } from 'src/app/aperturaparte/domain/parte.repository';
import { KeyPadButton } from 'src/app/interfaces/keypad-button.interface';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { UtilService } from 'src/app/services/util.service';
import { DialogoConfirmacionComponent } from 'src/app/shared/components/dialogoconfirmacion/dialogoconfirmacion.component';
import { AperturaparteComponent } from '../aperturaparte/aperturaparte.component';

@Component({
  selector: 'app-form-aperturaparte',
  templateUrl: './form-aperturaparte.component.html',
  styleUrls: ['./form-aperturaparte.component.css'],
  encapsulation: ViewEncapsulation.None   //Significa   que los estilo que uno defina solo afecte a ese componente
})
export class FormAperturaparteComponent implements OnInit {

  constructor(private readonly reference : MatDialogRef<FormAperturaparteComponent>,
    @Inject(MAT_DIALOG_DATA) private  data:any,
    //private barcodeScanner: BarcodeScanner,
    private readonly router:Router,
    private dialogo: MatDialog,
    private readonly util: UtilService,
    private readonly notifier : MatSnackBar,
    private readonly aperturaService : AperturaparteRepository,
    //public apertura: AperturaparteComponent
    

    ) { }

    title : string;
    group: FormGroup;
    
  

  @Input()codigoEmpleadoPadre : number

  
   listaEmpleado : EmpleadoLista[];

  qrData = null;
  scannedCode = null;
  collapsed: boolean;
  ngVersion = VERSION.full;
  @ViewChild('scanner')
  
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  path : string ;
  statusButton:string = "false";
  cantidadApoyo: number ;
  codigoEmpleado:number;
  NombreEmpleado:string;
  codigoEstacion: string ;
  codigoParte:string ;
  arrayempleado : number []

  @ViewChild('empleado') empleado: ElementRef;
  /*validarcodigoempleado(dato : string):boolean{
     
    var myArr = ["5","6","12","13","17","23","24","29","31","32","33","35","49","54","55","64"
    ,"67","68","76","82","86","89","91","176","257","299","303","305","384","5174","5192"]
    const resultado =  myArr.includes( dato ) 
    return resultado
  }
  */
  /*
  cambiarfocusautomatico(){
    
    const pasarsize =  this.validarcodigoempleado(this.group.controls['codigoEmpleado'].value)
    if  ((this.group.controls['codigoEmpleado'].value.length>4) || (pasarsize===true)){
    
     // this.listarEmpleado("")
      
  }
  
}
*/

ngAfterViewChecked() {
  //if (this.setFocus && this.cantidad && this.cantidad.nativeElement) {
   // this.nativeElement.focus(); // can do this because I check if there is a nativeElement above
   // this.setFocus = false;
   this.empleado.nativeElement.focus()
 // }
 }

private handleKeyDown(event: any)
{
    if (event.keyCode == 13)
    {


       if (parseInt(this.group.controls['codigoEmpleado'].value)===this.data){

        this.util.showMessage("Empleado ya esta registrado como principal")
      }

      else if (this.arrayempleado.includes(parseInt(this.group.controls['codigoEmpleado'].value))===false){
      //this.listarEmpleado("")
      }
     
      else {
          
        this.util.showMessage("Empleado ya esta agregado")

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
  
  ngOnChanges(changes: SimpleChanges) {
   
        console.log(changes);
  }

  ngOnInit(): void {

    this.initializeForm();
    this.path="/gestionpartes";
   this.cantidadApoyo = 0;
   this.codigoEmpleado = 0;
   this.listaEmpleado = []
   this.arrayempleado=[]
   setTimeout(()=>{ // this will make the execution after the above boolean has changed
    this.empleado.nativeElement.focus();
  
  },0);  

   // alert(this.apertura.GetEmpleado())

   this.listaEmpleado = this.data
   this.dataTable= this.listaEmpleado

   let index :number
   index = 0
   for (let clave of this.listaEmpleado){
     
    this.arrayempleado.push(this.listaEmpleado[index].codigoEmpleado);
    index ++;
  }


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
    
    const  datacantapoyo = {
          
      CantidadApoyo: this.listaEmpleado? this.listaEmpleado.length : 0,
      listaEmpleado: this.listaEmpleado? this.listaEmpleado :[]
      
      }
    
      
    this.reference.close(datacantapoyo);
      this.listaEmpleado=[]
      this.arrayempleado=[]
  }


  aceptar (){


    const  datacantapoyo = {
          
      CantidadApoyo: this.listaEmpleado? this.listaEmpleado.length : 0,
      listaEmpleado: this.listaEmpleado
      
      }
      
    this.reference.close(datacantapoyo);

    this.listaEmpleado=[]
    this.arrayempleado=[]

  }
   


  listarEstacion(codigoEstacion:string){

    /*const RequestEstacion: AperturaParteEstacion = <AperturaParteEstacion>{}; ;
    const values = this.group.value
   
    RequestEstacion.CodigoEstacion=  values["codigoEstacion"];
    if (this.group.controls['codigoEstacion'].valid){
        this.aperturaService.listarestacion(RequestEstacion).subscribe
        ((response) =>{

        
            this.listEstacionResponse = response
            this.codigoEstacion= this.listEstacionResponse.datos.result[0].codigoEstacion;
            this.group.controls['codigoEstacion'].setValue(this.listEstacionResponse.datos.result[0].codigoEstacion && ' - ' && this.listEstacionResponse.datos.result[0].descripcion );
            if (this.listEstacionResponse.datos.status!=200){
              this.util.showMessage(this.listEstacionResponse.meta.mensaje)
              }
          
            }, (errorServicio)=>{
              this.util.showMessage( errorServicio.error.meta.mensaje);
              this.group.controls['codigoEstacion'].setValue("");
            
      });
   
   
   }
   */
  }
  //parteresponse : ParteResponse;

  listar (codigoparte: number){

    /* if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
      const parte: RequestParte =  this.group.value;
      parte.CodigoParte = codigoparte;
      this.aperturaService.listar(parte).subscribe(response => 
      {
        this.listParterespuesta = response
        this.dataTable = this.listParterespuesta.datos.result;
      })
   
     }*/
  }
  insert(){

   /* if (this.group.valid){
     
       const fd= new FormData();
       const values = this.group.value
    
       fd.append("codigoCompania",'02100000');
       fd.append("codigoEmpleado",this.codigoEmpleado.toString());
       fd.append("codigoEstacion",this.codigoEstacion);
       fd.append ("codigoOrdenTrabajo" , values["codigoOrdenTrabajo"]);
       fd.append("cantidadApoyo",this.cantidadApoyo.toString());
       fd.append("fechaHoraInicioOt",this.miDatePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"));//"2021-06-14T10:31:14.507");
       fd.append("fechaHoraInicioActividad",this.miDatePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"));
       fd.append("fechaHoraTerminoActividad",null);
       fd.append("fechaHoraTerminoOt",null);
       

       const parte: ParteEntity = this.group.value;
      
       parte.codigoCompañia = fd.get("codigoCompania").toString() ;
       parte.codigoEmpleado = parseInt(fd.get("codigoEmpleado").toString()) ;
       parte.codigoEstacion= fd.get("codigoEstacion").toString() ;
       parte.codigoOrdenTrabajo = parseInt(fd.get("codigoOrdenTrabajo").toString()) ;
       parte.cantidadApoyo= parseInt(fd.get("cantidadApoyo").toString()) ;
       parte.fechaHoraInicioOt= fd.get("fechaHoraInicioOt").toString() ;
       parte.fechaHoraInicioActividad = fd.get("fechaHoraInicioActividad").toString() ;;
       parte.fechaHoraTerminoOt = null ;
       parte.fechaHoraTerminoActividad= null;
      
    this.aperturaService.insert(parte).subscribe((response) =>{
    this.listInsertParterespuesta = response
    this.util.showMessage(this.listInsertParterespuesta.meta.mensaje);
    this.listar(this.listInsertParterespuesta.datos.result.codigoParte)

    });
 
    }

*/
  }

  listaApertura: any[] = [];
  dataTable : EmpleadoLista[] 


  delete (row:EmpleadoLista){

    //const response: Observable<any> = this.util.confirm("Estas seguro de Eliminar");

    this.dialogo
    .open(DialogoConfirmacionComponent, {
      data: `¿Desea Eliminar Empleado?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        
        this.removeItem(row)
        this.dataTable = this.listaEmpleado;
        this.removeItemFromArr(this.arrayempleado,row.codigoEmpleado)
        
      } else {
       // alert("Deberías probarlo, a mí me gusta :)");
      }
    });

    //response.subscribe((response)=> console.log("response",response));
    //this.removeItemFromArr( this.listaEmpleado, row.codigoEmpleado );
   
 }

  removeItemFromArr ( arr, item ) {
  var i = arr.indexOf( item );

  if ( i !== -1 ) {
      arr.splice( i, 1 );
  }

  
}

removeItem(obj){
  this.listaEmpleado = this.listaEmpleado.filter(item => item !== obj);
}


 edit (){

     this.openModal({name: 'Marcela'})

 }

 nuevo (){

    this.initializeForm();
    this.listaApertura=[]
    this.dataTable = this.listaApertura;
    this.listaEmpleado=[]

 }

 
 cargarDatos(){

  this.group = new FormGroup({
    codigoEmpleado : new FormControl (this.listaApertura[0].codigoEmpleado,Validators.required),
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
  codigoEmpleado : new FormControl (null,Validators.required),
                                         // Validators.maxLength(10),
                                          //Validators.pattern(/^[1-9]\d{1,10}$/)]),
  codigoEstacion: new FormControl(null,Validators.required),
  codigoOrdenTrabajo: new FormControl(null,Validators.required),
  
 });
 }

openModal(record : any =  null){

  const options = {
       
    disableClose: true,
    panelClass:'container-form',
    data: record,
  };

  const reference =  this.util.openModal(
      FormAperturaparteComponent,
      options
    );
    reference.subscribe((response) => {
      if (response){
       this.util.showMessage("Datos guardados");
      }

    });

}
  
  listKeyPadButtons: KeyPadButton[] = [
    {icon:'description',color:'warn',action:'nuevo',tooltip:'Crear Nuevo Registro',texto : "Nuevo",estado:"false"},
    {icon:'add',color:'warn',action:'insert',tooltip:'Agregar Datos',texto:"Agregar",estado: "group.invalid"},
    {icon:'sensor_door',color:'warn',action:'salir',tooltip:'Salir De la Pantalla',texto:"Salir",estado:"false"}
  ];
  

  metadataTable: MetadataTable[] = [
    {field:"codigoEmpleado",title: "CodigoEmpleado"} ,
    {field:"NombreEmpleado", title: "Nombre Completo"},
   
  ];

  /*scanCode () {
   

    //alert("camara");
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      // selects the devices's back camera by default
      alert(devices);
      for (const device of devices) {
          if (device.deviceId === "03b7ab59427c8f29a5b9aba24b66417872c77ec38481f9ce20ab8eff655a80be") {
            this.hasCameras = true;
            console.log('Devices: ', devices);
            this.availableDevices = devices;
            return device;
          }
          console.log('Devices: ', devices);
      }
      console.log('Devices: ', devices);
    });

  
      this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;

  });
  

  this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
  });

  this.scanner.permissionResponse.subscribe((answer: boolean) => {
    this.hasPermission = answer;
  });

  }
  */

    handleQrCodeResult(resultString: string) {
      console.log('Result: ', resultString);
      this.qrResultString = resultString;
    }

    onDeviceSelectChange(selectedValue: string) {
      console.log('Selection changed: ', selectedValue);
     // this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    }

   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   dataSource = ELEMENT_DATA;
   
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
