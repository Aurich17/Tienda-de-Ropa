import { LoteResponse, ListaLote } from './../../../domain/response/lote_response';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editaloterequest } from 'src/app/Lotes/domain/request/lote_request';
import { LoteRepository } from 'src/app/Lotes/domain/lote.repository';
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
    descripcion : new FormControl (this.data?.descripcion,null),
    radio : new   FormControl(this.data?.estado,null),
   });
  }

  constructor(private readonly loteService : LoteRepository, @Inject(MAT_DIALOG_DATA) private data : ListaLote,private readonly  reference: MatDialogRef<EditaLotesComponent>) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoLote= this.data?.codigoLote
    alert(this.data?.codigoLote)
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
      alert('eDITADO CORRECTAMENTE');
    }
    
    )
  }  

}
