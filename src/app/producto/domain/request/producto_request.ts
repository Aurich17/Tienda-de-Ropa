export interface productorequest
{
    CodigoProducto:string,
    Descripcion:string,
    Color:string,
    Talla:string,
    Tipo_Prenda:number,
    Genero:string,
    PrecioUnitario :number,
    Estado:string
    CodigoEmpresa:String
};

export interface guardaproductorequest{CodigoProducto:string,Descripcion:string,Color:string,Talla:string,Tipo_Prenda:string,Genero:string,PrecioUnitario:number,Estado:string,Usuario_reg:string,Tipo:string};
export interface editaproductorequest{CodigoProducto:string,Descripcion:string,Color:string,Talla:string,Tipo_Prenda:string,Genero:string,PrecioUnitario:number,Estado:string,Usuario_reg:string,Tipo:string}