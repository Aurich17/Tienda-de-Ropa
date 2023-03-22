import { AgregarMenu, ListaMenus} from 'src/app/menus/domain/response/menu_response';
import { ManteMenuComponent} from './../mante-menu/mante-menu.component';
import { Component,Inject,OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { editamenurequest, guardamenurequest, menurequest } from 'src/app/menus/domain/request/menu_request';
import { MenuResponse } from 'src/app/menus/domain/response/menu_response';
import { MenuRepository } from 'src/app/menus/domain/menu.repository';
import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { MatTable } from '@angular/material/table';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-reg-menu',
  templateUrl: './reg-menu.component.html',
  styleUrls: ['./reg-menu.component.css']
})

export class RegMenuComponent implements OnInit  {
  select: 'A'|'I'='A'

  //------------------------------------------------------------------------------
  menusAgregar =[]; //ESTOS VALORES SON LOS QUE SE AGREGAn A LA TABLA CUANDO DE GUARDAR
  agregarResponse : AgregarMenu;
  //dataTable : ListaMenus[];
  menuResponse : MenuResponse
  subMenu = 'subMenu'
  group:FormGroup
  codigoMenu:number

  //TABLA QUE MUESTRA EN LA PANTALLA DE REG-MENU
  // metadataTable = [
  //   {field:'indicadorgrupomenu', title:'GrupoMenu'},
  //   {field:'descripcion',title:'Descripcion'},
  //   {field:'linkmenu',title:'Link-Menu'},
  //   {field:'codigogrupomenu', title:'Codigrupomenu'},
  //   {field:'estado',title:'Estado'},
  // ];

  initializeForm(){
    this.group = new FormGroup({
    desMenu : new FormControl (null,Validators.required),
    desIcono : new FormControl (null,Validators.required),
    grupoMenu : new FormControl (null,Validators.required),
    subMenu : new FormControl (null,Validators.required),
    desUrl : new FormControl (null,Validators.required),
    radio : new   FormControl(null,null),   
   })};

  constructor(private readonly menuService : MenuRepository, @Inject(MAT_DIALOG_DATA) private data : ListaMenus,private readonly  reference: MatDialogRef<RegMenuComponent>, private readonly util: UtilService){}
  
  ngOnInit(): void {
    console.log('Se a inicializado el REG-MENU');
    this.initializeForm();
  }
  closeModal() {
    this.reference.close();
  }
  
  guardamenu(){
    //Esto agarra los valores del HTML dentro del FormGroup
    const requestGuardaRol: guardamenurequest =<guardamenurequest>{}
    const valores = this.group.value

      requestGuardaRol.CodigoMenu = 0
      requestGuardaRol.Descripcion = valores['desMenu']
      requestGuardaRol.IndicadorGrupoMenu = valores['subMenu']
      requestGuardaRol.CodigoGrupoMenu = valores['grupoMenu']
      requestGuardaRol.linkmenu = valores['desUrl']
      requestGuardaRol.Estado = valores['radio']
      requestGuardaRol.iconomenu = valores['desIcono']
      requestGuardaRol.Usuario_reg = 'admin'
      requestGuardaRol.Tipo = 'I'

      if(requestGuardaRol.IndicadorGrupoMenu == true){
        requestGuardaRol.IndicadorGrupoMenu = false
      }
      else{
        requestGuardaRol.IndicadorGrupoMenu = true
      }
      this.menuService.guardamenu(requestGuardaRol).subscribe(response=>
      {
        this.menuResponse = response
        this.util.showMessage('GUARDADO CORRECTAMENTE')
        this.closeModal()
      }
      )
  }

  clear() {
    this.group.reset({radio: 'A'})
  }
}
