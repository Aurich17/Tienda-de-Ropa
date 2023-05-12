import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { MetadataTable } from 'src/app/interfaces/metada-table.interface';

import { loterequest } from 'src/app/lotes/domain/request/lote_request';

import { ProductoRepository } from 'src/app/producto/domain/producto.repository';
import { productorequest } from 'src/app/producto/domain/request/producto_request';
import { ProductoResponse } from 'src/app/producto/domain/response/producto.response';
import { UtilService } from 'src/app/services/util.service';
import { tiendarequest } from 'src/app/tienda/domain/request/tienda_request';
import { ListaTienda, TiendaResponse } from 'src/app/tienda/domain/response/tienda_response';
import { TiendaRepository } from 'src/app/tienda/domain/tienda.repository';
import { TransaccionDetalle } from '../../domain/ingresoproducto-entity';
import { IngresoProductoRequest, ListaTransaccionDetalle, ParametrosRequest } from '../../domain/ingresoproducto-request';
import { IngresoProducto, IngresoProductoResponse, ParametrosResponse, TransaccionResponse } from '../../domain/ingresoproducto-response';
import { ListaLote, LoteResponse } from 'src/app/lotes/domain/response/lote_response';

import { IngresoProductoRepository } from '../../domain/ingresorproducto.repository';
import { AlmacenResponse, ListaAlmacen } from 'src/app/almacen/domain/response/almacen_response';
import { AlmacenRepository } from 'src/app/almacen/domain/almacen.repository';
import { almacenrequest } from 'src/app/almacen/domain/request/almacen_request';

import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { LoteService } from 'src/app/services/lote.service';
import { LoteRepository } from 'src/app/lotes/domain/lote.repository';




@Component({
  selector: 'app-ingresoproducto',
  templateUrl: './ingresoproducto.component.html',
  styleUrls: ['./ingresoproducto.component.css']
})
export class IngresoproductoComponent implements OnInit {


  group: FormGroup;

  private  ResponseIngresoProducto : IngresoProductoResponse
  private ResponseAlmacen : AlmacenResponse
  private ResponseTienda : TiendaResponse
  private ResponseProducto : ProductoResponse
  private ResponseLote : LoteResponse
  private ResponseParametro: ParametrosResponse

  dataTable : TransaccionDetalle[]
  Almacen: ListaAlmacen[] 
  Tienda : ListaTienda[]
  Lote : ListaLote[]
  ListaProductoItem :TransaccionDetalle 
  ListaTmpTransaccionItem:TransaccionDetalle[] = []
  ListaTmpTransaccionItemGeneral:TransaccionDetalle[]
  


  
  constructor(  private readonly IngresoProductoService : IngresoProductoRepository,
    private readonly AlmacenService : AlmacenRepository,
    private readonly TiendaService : TiendaRepository,
    private readonly ProductoService: ProductoRepository,
    private readonly util: UtilService,
    private miDatePipe: DatePipe,
    private readonly storage :StorageService,
    private  LoteServ : LoteRepository
    ) { }

  ngOnInit(): void {

    this.initializeForm()
    this.ListarAlmacen("")
    //this.ListarTienda("")
    this.ListarLote("")
     this.ObtenerCorrelativo("NI")
    //this.ListaTmpTransaccionItem = []

  }


ListarTransaccion (param_CodigoTransaccion: number){

  if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
      const ingresoproductorequest: IngresoProductoRequest =<IngresoProductoRequest>{}

      ingresoproductorequest.Codigotransaccion = param_CodigoTransaccion
      this.IngresoProductoService.listartransaccion(ingresoproductorequest).subscribe(response => 
          {
            this.ResponseIngresoProducto = response
            //this.dataTable = this.ResponseIngresoProducto.datos.result;
          }
            )

  }
}


ListarProducto (param_Empresa:string,param_CodigoProducto:string){

const ProductoRequest : productorequest = <productorequest>{}
const values = this.group.value

if (values["codigoproducto"]!=null && values["codigoproducto"]!=""){

ProductoRequest.CodigoProducto = param_CodigoProducto
ProductoRequest.CodigoEmpresa = param_Empresa 
ProductoRequest.Descripcion = "%"
ProductoRequest.Color = "%"
ProductoRequest.Talla = "%"
ProductoRequest.Tipo_Prenda = 0
ProductoRequest.Genero = "%"
ProductoRequest.Estado = "A"


this.ProductoService.listar(ProductoRequest).subscribe(response => 
  {

    this.ResponseProducto = response

  if (this.ResponseProducto.datos.status!=200){
      this.util.showMessage(this.ResponseProducto.meta.mensaje)
  }else{

    this.group.controls['descripcion'].setValue(response.datos.result[0].descripcion)
    this.group.controls['stockactual'].setValue(response.datos.result[0].stock)
    //this.group.controls['lote'].setValue(this.ResponseProducto.datos.result[0])
    //this.group.controls['costounitario'].setValue(0)
    //this.group.controls['stockactual'].setValue(0)
    //lote : new FormControl (null,Validators.required),

      }

}, (errorServicio)=>{
  this.util.showMessage( errorServicio.error.meta.mensaje);
  this.group.controls['codigoproducto'].setValue("");
  this.group.controls['descripcion'].setValue("")
  this.group.controls['cantidad'].setValue(0)
  this.group.controls['costounitario'].setValue(0.0)
  this.group.controls['stockactual'].setValue(0)
  
})

}else {

this.util.showMessage("Ingrese un valor valido")

}

}



ListarAlmacen (Empresa : string ){

  const Almacenequest: almacenrequest =<almacenrequest>{}

      Almacenequest.Descripcion = '%'
      Almacenequest.Estado='A'
      this.AlmacenService.listar(Almacenequest).subscribe(response => 
          {
            this.ResponseAlmacen = response
            this.Almacen = this.ResponseAlmacen.datos.result;
          }
            )



}

ListarTienda (Empresa : string ){


  
const TiendaRequest: tiendarequest =<tiendarequest>{}

TiendaRequest.Descripcion = '%'
TiendaRequest.Estado = 'A'
 
this.TiendaService.listar(TiendaRequest).subscribe(Response=>
  {
 this.ResponseTienda = Response
 this.Tienda = this.ResponseTienda.datos.result
  }
  )
}

ListarLote (Empresa : string ){

  
  const LoteRequest: loterequest =<loterequest>{}
  
  LoteRequest.Descripcion = '%'

  LoteRequest.Estado = 'A'

  this.LoteServ.listarLote(LoteRequest).subscribe(Response=>
    {
   this.ResponseLote = Response
   this.Lote = this.ResponseLote.datos.result
    }
    )
   
   
    
  }


  AgregarItem (event ){
  
    //ListaProducto: TransaccionDetalle[] 

    
    if (event.pointerType!="") {
        const values = this.group.value

        alert(event.pointerType);
        
        this.ListaProductoItem   = <TransaccionDetalle>{} 

        this.ListaProductoItem.CodigoProducto = values["codigoproducto"]
        this.ListaProductoItem.Descripcion = values["descripcion"]
        this.ListaProductoItem.cantidad = values["cantidad"]
        this.ListaProductoItem.PrecioUnitario = values["costounitario"]
        this.ListaProductoItem.IsEditing = false

        if (this.ListaProductoItem.Descripcion != null && this.ListaProductoItem.Descripcion != ""){

          if    (this.ListaProductoItem.cantidad !=0 && this.ListaProductoItem.PrecioUnitario != 0){

          const index = this.ListaTmpTransaccionItem.findIndex(i => i.CodigoProducto ===this.ListaProductoItem.CodigoProducto )

          if (index ===-1){

           

              
              this.dataTable = this.ListaTmpTransaccionItemGeneral
              this.ListaTmpTransaccionItem.push(this.ListaProductoItem)
             // alert(this.ListaProductoItem.Descripcion)
             
              this.dataTable = Array.from(this.ListaTmpTransaccionItem)   
          
           
             
          }
        }

        }

  }

  

  }

  EliminarItem(row :TransaccionDetalle ){

    const index  = this.ListaTmpTransaccionItem.findIndex( x => x.CodigoProducto === row.CodigoProducto )
     

    if (index !== -1){

     this.ListaTmpTransaccionItem.splice(index,1)

     //this.dataTable = this.ListaTmpTransaccionItem

     this.dataTable  =  Array.from(this.ListaTmpTransaccionItem)

    }
  }


  editItem(row : any) 
  {
     row.IsEditing = true 
     
     this.dataTable  =  Array.from(this.ListaTmpTransaccionItem)
  }

  saveItem(row:any){
    row.IsEditing = false 

    const index = this.ListaTmpTransaccionItem.findIndex(i => i.CodigoProducto === row.codigoproducto);
   // this.ListaTmpTransaccionItem[index].cantidad = row.cantidad;
   // this.ListaTmpTransaccionItem[index].cantidad = row.;



     
    this.dataTable  =  Array.from(this.ListaTmpTransaccionItem)
  }

  cancelEditItem (row:any){
   
    row.IsEditing = false 
     this.dataTable  =  Array.from(this.ListaTmpTransaccionItem)

  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const worksheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
        // Aquí puedes procesar los datos de la hoja de cálculo
        this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      };
      reader.readAsBinaryString(file);
    }
  }

  data: any[] = [];

  importFile (){

    this.data.forEach(element => { 
      if (element.length>0){
      this.ListaProductoItem   = <TransaccionDetalle>{} 

      this.ListaProductoItem.CodigoProducto = element[0]
      this.ListaProductoItem.Descripcion = element[1]
      this.ListaProductoItem.cantidad = element[2]
      this.ListaProductoItem.PrecioUnitario = element[3]
      this.ListaProductoItem.IsEditing = false
      
      this.ListaTmpTransaccionItem.push(this.ListaProductoItem)

      }

 });
    
    
    
    this.dataTable = Array.from(this.ListaTmpTransaccionItem)   
      
  }

  VIngresoProductoRequest : IngresoProductoRequest
  ListItemTransaccion : ListaTransaccionDetalle
  CorrelativoDocumento : string 
  ResponseTransaccion : TransaccionResponse
  VParametroRequest:  ParametrosRequest
  grabarIngreso(){

   if  (this.ListaTmpTransaccionItem.length>0 ) {

    
   
         
    this.VIngresoProductoRequest = <IngresoProductoRequest>{}
    const valuesInsert = this.group.value
    this.VIngresoProductoRequest.TransaccionDetalle = []

    this.VIngresoProductoRequest.Codigotransaccion = 0 
    this.VIngresoProductoRequest.CodigoTipoTransaccion = 'IPP'
    this.VIngresoProductoRequest.CodigoTienda = 0
    this.VIngresoProductoRequest.CodigoAlmacen =  valuesInsert["almacen"]
    this.VIngresoProductoRequest.TipoDocumento = 'NI'
    this.VIngresoProductoRequest.NroDocumento = this.CorrelativoDocumento
    this.VIngresoProductoRequest.FechaDocumento = this.miDatePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss");
    this.VIngresoProductoRequest.Periodo = parseInt(this.miDatePipe.transform(new Date(), "yyyyMMdd"));
    this.VIngresoProductoRequest.Montototal = 0
    this.VIngresoProductoRequest.Observacion = valuesInsert["observacion"] == null ? "" : valuesInsert["observacion"];
    this.VIngresoProductoRequest.Estado = 'PR'
    this.VIngresoProductoRequest.Usuario = this.storage.get("codusuario")
    this.VIngresoProductoRequest.Tipo = 'I'
    this.VIngresoProductoRequest.CodigoEmpresa = this.storage.get("codcompania")
     
    this.ListaTmpTransaccionItem.forEach(item => {
      this.ListItemTransaccion = <ListaTransaccionDetalle>{}

      this.ListItemTransaccion.CodigoTransaccion = "0"
      this.ListItemTransaccion.CodigoProducto = item.CodigoProducto
      this.ListItemTransaccion.Cantidad = item.cantidad
      this.ListItemTransaccion.PrecioUnitario = item.PrecioUnitario
      this.ListItemTransaccion.TipoDocumento = 'NI'
      this.ListItemTransaccion.NroDocumento = this.CorrelativoDocumento
      this.ListItemTransaccion.Lote = valuesInsert["lote"],
      this.ListItemTransaccion.MontoTotal = item.cantidad * item.PrecioUnitario,
      this.ListItemTransaccion.CodigoEmpresa=this.storage.get("codcompania")
      
      this.ListItemTransaccion.Observaciones =  valuesInsert["ObservacionDetalle"] == null ? "" : valuesInsert["ObservacionDetalle"], 
      this.ListItemTransaccion.Estado = 'PR' ,
      this.ListItemTransaccion.Accion = 'I' 

   
      this.VIngresoProductoRequest.TransaccionDetalle.push(this.ListItemTransaccion)

    });


    this.IngresoProductoService.GuardarTransaccion(this.VIngresoProductoRequest).subscribe(response => 
      {
    
        this.ResponseTransaccion = response
    
      if (this.ResponseTransaccion.datos.status!=200){
          this.util.showMessage(this.ResponseTransaccion.meta.mensaje)
      }else{
    
        this.util.showMessage(this.ResponseTransaccion.meta.mensaje +"Registro Exitoso" + " Documento Nro:" + this.CorrelativoDocumento )
        this.Nuevo()
          }
    
    }, (errorServicio)=>{
       var ErrorMensaje =''
     
      this.util.showMessage("Error al guardar la transacción. Por favor, inténtelo de nuevo más tarde.")
      
    })

     
   }else {

this.util.showMessage("Agrege un producto por favor")

   }

  }

  ObtenerCorrelativo(TipoDocumento:string): string {
   
    this.VParametroRequest = <ParametrosRequest>{}

    this.VParametroRequest.CodigoParametros =TipoDocumento
    this.VParametroRequest.CodigoSistema="VET"

    this.IngresoProductoService.ListarCorrelativo(this.VParametroRequest).subscribe(response => 
      {
    
        this.ResponseParametro = response
    
      if (this.ResponseParametro.datos.status!=200){
          this.util.showMessage(this.ResponseParametro.meta.mensaje)
      }else{
    
        this.CorrelativoDocumento = response.datos.result[0].descripcion.toString().trim()
        this.CorrelativoDocumento =  this.CorrelativoDocumento.toString().padStart(8,'0')
        
        //this.group.controls['lote'].setValue(this.ResponseProducto.datos.result[0])
        //this.group.controls['costounitario'].setValue(0)
        //this.group.controls['stockactual'].setValue(0)
        //lote : new FormControl (null,Validators.required),
    
          }
    
    }, (errorServicio)=>{
      this.util.showMessage( errorServicio.error.meta.mensaje);
      this.CorrelativoDocumento= "0" 
    })

    return  this.CorrelativoDocumento
  }


  Nuevo(){

    this.initializeForm()
    this.ListaTmpTransaccionItem = []
    this.dataTable = Array.from(this.ListaTmpTransaccionItem)
    this.ObtenerCorrelativo("NI")
  } 

///Metodos utilitarios

initializeForm(){
  this.group = new FormGroup({

  codigoproducto : new FormControl (null,null),
  descripcion : new FormControl (null,null),
  lote : new FormControl (null,Validators.required),
  observacion : new FormControl(null,null),
  cantidad : new FormControl (0,null),
  costounitario : new FormControl (0.0,null),
  stockactual : new FormControl (0,null ),
  almacen : new FormControl (null,Validators.required),
  tienda : new FormControl (null,null),
  ObservacionDetalle : new FormControl (null,null),
                                    
 });
 }


handleKeyDown(event: any,tipo:string)
{
    if (event.keyCode == 13)
    {

      198
      
        
      if (tipo==="Producto"){
        const values = this.group.value
        this.ListarProducto("00000001",values["codigoproducto"])

        alert('producto')
        
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

  limpiartexto(control:string ){

  }

  metadataTable: MetadataTable[] = [
    {field:"CodigoProducto",title: "Cod. Producto",editable : false,type:"text" },
    {field:"Descripcion", title: "Descripcion",editable : false,type:"text" },
    {field:"cantidad", title: "Cantidad",editable : true,type:"number" },
    // {field:"Lote", title: "Lote"},
    {field:"PrecioUnitario", title: "Precio Unitario",editable : true,type:"number" },
  
  ];

}
