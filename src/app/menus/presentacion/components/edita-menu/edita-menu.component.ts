import { ListaMenus } from './../../../domain/response/menu_response';
import { ManteMenuComponent} from './../mante-menu/mante-menu.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editamenurequest, guardamenurequest, menurequest } from 'src/app/menus/domain/request/menu_request';
import { MenuResponse } from 'src/app/menus/domain/response/menu_response';
import { MenuRepository } from 'src/app/menus/domain/menu.repository';
import { RegMenuComponent } from '../reg-menu/reg-menu.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-edita-menu',
  templateUrl: './edita-menu.component.html',
  styleUrls: ['./edita-menu.component.css']
})
export class EditaMenuComponent implements OnInit {
  value = true
  menuResponse: MenuResponse;
  group:FormGroup;
  codigoMenu:number
  
  initializeForm(){
    this.group = new FormGroup({
    desMenu : new FormControl (this.data?.descripcion,Validators.required),
    desIcono: new FormControl (this.data?.iconomenu,Validators.required),
    boolean : new FormControl (this.data?.indicadorgrupomenu,Validators.required),
    grupoMenu: new FormControl (this.data?.codigogrupomenu,Validators.required),
    desUrl : new FormControl (this.data?.linkmenu,Validators.required),
    radio : new   FormControl(this.data?.estado,null),   
   });
  }

  constructor(private readonly menuService : MenuRepository, @Inject(MAT_DIALOG_DATA) private data : ListaMenus,private readonly  reference: MatDialogRef<EditaMenuComponent>,  private readonly util: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.codigoMenu= this.data?.codigoMenu
  }
  closeModal() {
    this.reference.close();
  }
  editamenu(){
    const valores = this.group.value //Esto agarra los valores del HTML dentro del FormGroup
    const requestEditaMenu: editamenurequest =<editamenurequest>{}
    
    requestEditaMenu.CodigoMenu = this.codigoMenu
    requestEditaMenu.Descripcion = valores['desMenu']
    requestEditaMenu.IndicadorGrupoMenu = valores['boolean']
    requestEditaMenu.iconomenu=valores['desIcono']
    requestEditaMenu.linkmenu = valores['desUrl']  
    requestEditaMenu.CodigoGrupoMenu = valores['grupoMenu']
    requestEditaMenu.Estado = valores['radio']
    requestEditaMenu.Usuario_reg = 'admin'
    requestEditaMenu.Tipo = 'U'
    
    if(requestEditaMenu.IndicadorGrupoMenu == true){
      requestEditaMenu.IndicadorGrupoMenu = false;
    }
    else{
      requestEditaMenu.IndicadorGrupoMenu = true;
    }

    this.menuService.editamenu(requestEditaMenu).subscribe(response=>

    {
      this.menuResponse = response
      this.util.showMessage('EDITADO CORRECTAMENTE')
      this.closeModal()
    }
    )
  }
  clear() {
    this.group.reset({radio: 'A'})
  }
  
}