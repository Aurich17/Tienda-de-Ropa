export interface menurequest{Descripcion:string,IndicadorGrupoMenu:boolean,Estado:string,CodigoGrupoMenu:number};//Estos son los datos para filtrar

export interface guardamenurequest{CodigoMenu:number,Descripcion:string,IndicadorGrupoMenu:boolean,iconomenu:string,linkmenu:string,
    CodigoGrupoMenu:number,Estado:string,Usuario_reg:string,Tipo:string};

export interface editamenurequest{CodigoMenu:number, Descripcion:string,IndicadorGrupoMenu:boolean,
    iconomenu:string,CodigoGrupoMenu:number,Estado:string,Usuario_reg: string,Tipo:string, linkmenu:string}