export class Producto {
    id:number;
    nombre:string;
    categoria:string;
    cantidad:string;

    constructor(id: number = 0, nombre: string = '', categoria: string = '', cantidad: string = '') {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.cantidad = cantidad;
    }
}