export interface MenuResponse{
    datos : {status:number ,TotalRegistro : number ,
    
        result :ListaMenus[]

    },

    
    meta: { mensaje : string }        
}

export interface ListaMenus{
  codigoMenu:number;
  indicadorgrupomenu:boolean;
  descripcion:string;
  iconomenu:string;
  linkmenu:string;
  codigogrupomenu:number;
  estado:string;
  usuario_reg:string;
  fecha_hora_reg:string;
  usuario_mod:string;
  fecha_hora_mod:string;  
}

export interface AgregarMenu{
  agregarTabla: MenuAgregar[]
}

export interface MenuAgregar{
  indicadorgrupomenu:boolean;
  descripcion:string;
  iconomenu:string;
  linkmenu:string;
  codigogrupomenu:number;
  estado:string;
}
