
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { editaloterequest } from 'src/app/lotes/domain/request/lote_request';
import { ListaLote, LoteResponse } from 'src/app/lotes/domain/response/lote_response';
import { LoteRepository } from 'src/app/lotes/domain/lote.repository';

import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-edita-lotes',
  templateUrl: './edita-lotes.component.html',
  styleUrls: ['./edita-lotes.component.css']
})
export class EditaLotesComponent implements OnInit {
  group:FormGroup
  codigoLote:number
  loteResponse:LoteResponse
  initializeForm(){
    this.group = new FormGroup({
    descripcion : new FormControl (this.data?.descripcion,Validators.required),
    radio : new   FormControl(this.data?.estado,Validators.required),
   });
  }

  constructor(private readonly loteService : LoteRepository, @Inject(MAT_DIALOG_DATA) private data : ListaLote,private readonly  reference: MatDialogRef<EditaLotesComponent>, private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoLote= this.data?.codigoLote
  }

  closeModal() {
    this.reference.close();
  }

  editaLote(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaLote: editaloterequest =<editaloterequest>{}

    requestEditaLote.CodigoLote = this.codigoLote.toString()
    requestEditaLote.Descripcion = valores['descripcion']
    requestEditaLote.Estado = valores['radio']
    requestEditaLote.Usuario = 'Admin'
    requestEditaLote.Tipo = 'U'

    this.loteService.editalote(requestEditaLote).subscribe(response=>
    {
      this.loteResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE')
      this.closeModal()
    }

    )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }

}
