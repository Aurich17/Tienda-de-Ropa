import { MetadataTable } from 'src/app/interfaces/metada-table.interface';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MenuRepository } from 'src/app/menus/domain/menu.repository';
import { ListaMenus, MenuResponse } from 'src/app/menus/domain/response/menu_response';
import { UtilService } from 'src/app/services/util.service';
import { RegMenuComponent } from '../reg-menu/reg-menu.component';
import { EditaMenuComponent } from '../edita-menu/edita-menu.component';
import { menurequest } from 'src/app/menus/domain/request/menu_request';
import { Injectable } from "@angular/core";
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-mante-menu',
  templateUrl: './mante-menu.component.html',
  styleUrls: ['./mante-menu.component.css'],
})
export class ManteMenuComponent implements OnInit {
  dataTable : ListaMenus[];
  menuResponse : MenuResponse;
  listaMenu: ListaMenus;
  group:FormGroup;
  nivel='nivel'
  menus='menus'
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<RegMenuComponent, any> | undefined;

  metadataTable : MetadataTable[] = [
    {field:'codigoMenu',title:'Cod.Menu'},
    {field:'indicadorgrupomenu', title:'GrupoMenu'},
    {field:'descripcion',title:'Descripcion'},
    {field:'linkmenu',title:'Link-Menu'},
    {field:'codigogrupomenu', title:'Codigrupomenu'},
    {field:'estado',title:'Estado'},
    {field:'usuario_reg', title:'Usuario-Reg'}
  ];

  initializeForm(){
    this.group = new FormGroup({
      desMenu : new FormControl(null, null),
      listMenu : new FormControl(null, null),
      estado : new FormControl(null, null)
    })
  }

  constructor(public matDialog: MatDialog, private readonly menuService: MenuRepository, private readonly util : UtilService) { }

  ngAfterViewInit(): void {
    document.onclick = (args: any) : void => {
          if(args.target.tagName === 'BODY') {
              this.modalDialog?.close()
          }
      }
  }


  agregarMenu() {
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "800px";
    this.dialogConfig.width = "700px";
    this.modalDialog = this.matDialog.open(RegMenuComponent, this.dialogConfig);
  }
  openModal(record : any){
    record =  this.listaMenu
   //record = this.codigoEmpleado
   //this.cantidadApoyo = 0;
 
   const options = {
        
     disableClose: true,
     panelClass:'container-form',
     data: record,
   };
 
   const reference =  this.util.openModal(
    EditaMenuComponent,
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

  onFormSubmit() {}

  listar(){
    if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
      
      const requestMenu: menurequest =<menurequest>{}//  this.group.value;
      requestMenu.Descripcion='%'
      requestMenu.Estado='A'
      requestMenu.IndicadorGrupoMenu=false

        this.menuService.listar(requestMenu).subscribe(response => 
          {
            this.menuResponse = response
            this.dataTable = this.menuResponse.datos.result;
          }
            )
  }
  }

  editar(menus:ListaMenus){
    this.listaMenu = menus;
    this.openModal(this.menus);
  }

  listarfiltro(){
    console.log();
    // console.log(this.jj)
    if (this.group.valid){
     
      const fd= new FormData();
      const values = this.group.value
    
      const requestMenu: menurequest =<menurequest>{}//  this.group.value;
     
      requestMenu.Descripcion= values['desMenu']
      requestMenu.IndicadorGrupoMenu = values['listMenu'] 
      requestMenu.Estado= values['estado']
      requestMenu.CodigoGrupoMenu = values['listGrupo']
      if(requestMenu.Descripcion === '' || requestMenu.Descripcion == null){
        requestMenu.Descripcion = '%'
      }
        this.menuService.listarfiltro(requestMenu).subscribe(response => 
          {
            this.menuResponse = response
            this.dataTable = this.menuResponse.datos.result;
          }
            )

  }}
}

