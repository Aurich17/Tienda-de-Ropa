import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedidaRepository } from 'src/app/Medida/domain/medida.repository';
import { editaMedidarequest } from 'src/app/Medida/domain/request/medida_request';
import { MedidaResponse, ListaMedida } from 'src/app/Medida/domain/response/medida_response';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-edita-medida',
  templateUrl: './edita-medida.component.html',
  styleUrls: ['./edita-medida.component.css']
})
export class EditaMedidaComponent implements OnInit {

  group:FormGroup
  codigoAlmacen:number
  almacenResponse:MedidaResponse
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (this.data?.descripcion,Validators.required),
    radio : new FormControl(this.data?.estado,Validators.required),
   });
  }
  constructor(private readonly MedidaService : MedidaRepository, @Inject(MAT_DIALOG_DATA) private data : ListaMedida,private readonly  reference: MatDialogRef<EditaMedidaComponent>, private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoAlmacen= this.data?.codigoUnidadMedida
  }

  closeModal() {
    this.reference.close();
  }

  guarda(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaAlmacen: editaMedidarequest =<editaMedidarequest>{}
    
    requestEditaAlmacen.CodigoUnidadMedida = this.codigoAlmacen.toString()
    requestEditaAlmacen.Descripcion = valores['descripcion']
    requestEditaAlmacen.Estado = valores['radio']
    requestEditaAlmacen.Usuario_reg = 'Admin'
    requestEditaAlmacen.Tipo = 'U'
    
    this.MedidaService.editaalmacen(requestEditaAlmacen).subscribe(response=>
    {
      this.almacenResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE')
      this.closeModal()
    }
    
    )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }  

}
