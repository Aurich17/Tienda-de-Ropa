import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RegProductoComponent } from '../reg-producto/reg-producto.component';
import { ListaProducto, ProductoResponse } from 'src/app/producto/domain/response/producto.response';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { ProductoRepository } from 'src/app/producto/domain/producto.repository';
import { UtilService } from 'src/app/services/util.service';
import { EditaProductoComponent } from '../edita-producto/edita-producto.component';
import { productorequest } from 'src/app/producto/domain/request/producto_request';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-mante-producto',
  templateUrl: './mante-producto.component.html',
  styleUrls: ['./mante-producto.component.css']
})
export class ManteProductoComponent implements OnInit {
  select: 'M'|'F'|'%' = '%'
  labelPosition: 'I'|'A' = 'A'
  producto:string
  dataTable: ListaProducto[]
  listaProducto : ListaProducto
  productoResponse:ProductoResponse
  group:FormGroup
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegProductoComponent, any> | undefined;

  metadataTable: MetadataTable[] = [
    {field:"codigoProducto",title: "Cod.Producto"} ,
    {field:"descripcion", title: "Desc.Producto"},
    {field:"color", title: "Color"},
    {field:"talla",title:"Talla"},
    {field:"tipoPrenda", title:"Tipo Prenda"},
    {field:"genero",title:"Genero"},
    {field:"estado", title: "Estado"},
    {field:"usuarioReg", title: "Usu.Reg"},
    {field:"fecha_hora_reg", title: "Fecha Hora Registro"},
    {field:"usuario_mod", title: "Usu.Mod"},
    {field:"fecha_hora_mod", title: "Fecha Hora Mod"},     

  ];
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (null,null),
    colores : new FormControl(null,null),
    tallas: new FormControl(null,null),
    prendas: new FormControl(null,null),
    genero: new FormControl(null,null),
    radio : new   FormControl(null,null),   
   });
   }

  constructor(public matDialog: MatDialog, private readonly productoService : ProductoRepository, private readonly util: UtilService, private readonly storage :StorageService,) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }
  

  agregar() {
    
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "600px";
    this.dialogConfig.width = "500px";
    this.dialogConfig.disableClose = true
    this.modalDialog = this.matDialog.open(RegProductoComponent, this.dialogConfig);
  }

  openModal(record : any){
    record =  this.listaProducto
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;
 
   const options = {
        
     disableClose: true,
     panelClass:'editaProducto',
     data: record,
   };
 
   const reference =  this.util.openModal(
    EditaProductoComponent,
      options,
     
     );
     reference.subscribe((response) => {
      this.listar()
       if (response){
        
        // this.cantidadApoyo = response.CantidadApoyo;
        // this.listaEmpleado = response.listaEmpleado
       }
     });
 }

 ngOnInit(): void {  
  this.initializeForm();
  this.listar();
}

listar (){
  if (this.group.valid){
   
    const fd= new FormData();
    const values = this.group.value
  
    const requestProducto: productorequest =<productorequest>{}//  this.group.value;
    requestProducto.CodigoEmpresa = this.storage.get("codcompania").toString()
    requestProducto.CodigoProducto = '0'
    requestProducto.Descripcion= '%'
    requestProducto.Color = '%'
    requestProducto.Talla = '%'
    requestProducto.Tipo_Prenda = 0
    requestProducto.Genero = '%'
    requestProducto.Estado= 'A'
    console.log('Esta Listando')

      this.productoService.listar(requestProducto).subscribe(response => 
        {
          this.productoResponse = response
          this.dataTable = this.productoResponse.datos.result;
        }
          )

}
}
editar(producto:ListaProducto){
  this.listaProducto = producto;
  this.openModal(this.producto);
}

listarfiltro(){
  // console.log(this.jj)
  if (this.group.valid){
   
    const fd= new FormData();
    const values = this.group.value
  
    const requestProducto: productorequest =<productorequest>{}//  this.group.value;
   
    requestProducto.Descripcion= values['descripcion']
    requestProducto.Color = values['colores']
    requestProducto.Talla = values['tallas']
    requestProducto.Tipo_Prenda = values['prendas']
    requestProducto.Genero = values['genero']
    requestProducto.Estado= values['radio']

    if(requestProducto.Descripcion === '' || requestProducto.Descripcion == null){
      requestProducto.Descripcion = '%'
    }
    if(requestProducto.Color === '' || requestProducto.Color == null){
      requestProducto.Color = '%'
    }
    if(requestProducto.Talla === '' || requestProducto.Talla == null){
      requestProducto.Talla = '%'
    }
    if(requestProducto.Tipo_Prenda == null){
      requestProducto.Tipo_Prenda = 0
    }
    if(requestProducto.Genero === '' || requestProducto.Genero == null){
      requestProducto.Genero = '%'
    }
      this.productoService.listarfiltro(requestProducto).subscribe(response => 
        {
          this.productoResponse = response
          this.dataTable = this.productoResponse.datos.result;
        }
          )
}}
}
