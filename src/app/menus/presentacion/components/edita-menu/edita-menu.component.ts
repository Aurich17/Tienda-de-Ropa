import { ListaMenus } from './../../../domain/response/menu_response';
import { ManteMenuComponent} from './../mante-menu/mante-menu.component';
import { Component,Inject,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editamenurequest, guardamenurequest, menurequest } from 'src/app/menus/domain/request/menu_request';
import { MenuResponse } from 'src/app/menus/domain/response/menu_response';
import { MenuRepository } from 'src/app/menus/domain/menu.repository';
import { RegMenuComponent } from '../reg-menu/reg-menu.component';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';

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
    desMenu : new FormControl (this.data?.descripcion,null),
    desIcono: new FormControl (this.data?.iconomenu,null),
    boolean : new FormControl (this.data?.indicadorgrupomenu,null),
    grupoMenu: new FormControl (this.data?.codigogrupomenu,null),
    desUrl : new FormControl (this.data?.linkmenu,null),
    radio : new   FormControl(this.data?.estado,null),   
   });
  }

  constructor(private readonly menuService : MenuRepository, @Inject(MAT_DIALOG_DATA) private data : ListaMenus,private readonly  reference: MatDialogRef<EditaMenuComponent>) { }

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
    requestEditaMenu.Descripcion = valores['desMenu']//NO SE PUEDE EDITAR LA DESC, TAMPOCO DEL POSTMAN  
    requestEditaMenu.IndicadorGrupoMenu = valores['boolean']//SE PUEDE EDITAR
    requestEditaMenu.iconomenu=valores['desIcono']//SE PUEDE EDITAR
    requestEditaMenu.linkmenu = valores['desUrl'] //NO SE PUEDE EDITAR EL LINK, TAMPOCO SE PUEDE DEL POSTMAN  
    requestEditaMenu.CodigoGrupoMenu = valores['grupoMenu']//SE PUEDE EDITAR
    requestEditaMenu.Estado = valores['radio']//SE PUEDE EDITAR
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
      alert('Editado con EXITO');
    }
    )
  }
  
}