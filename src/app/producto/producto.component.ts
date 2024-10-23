import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TableModule } from 'primeng/table';
import { ProductoService } from '../services/producto.service';  // Ajusta la ruta según tu proyecto
import { Producto } from '../models/producto';  // Ajusta según la estructura de tu proyecto
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports:[HomeComponent,TableModule,ButtonModule,DialogModule,RouterModule,InputTextModule,FormsModule,ConfirmDialogModule,ToastModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productos: Producto[]=[];
  titulo:string='';
  opc:string='';
  producto= new Producto();
  op = 0;
  visible: boolean = false; 
 isDeleteInProgress: boolean = false;

  constructor(
    private productoService: ProductoService, 
    private messageService: MessageService
  ) {}

  ngOnInit():void{
    this.listarProductos();
  }

  listarProductos(){
    this.productoService.getProductos().subscribe((data)=>{
      this.productos=data;
    });
  }

  hola(id:number){
    console.log('button clicked '+id);
  }
    showDialogCreate() {
      this.titulo="Crear Producto"
      this.opc="Save";   
      this.op=0;
      this.visible = true; // Cambia la visibilidad del diálogo
    }
    showDialogEdit(id:number) {
      this.titulo="Editar Producto"
      this.opc="Editar"; 
     this.productoService.getProductoById(id).subscribe((data)=>{
        this.producto=data; 
        this.op=1;     
     });    
      this.visible = true; // Cambia la visibilidad del diálogo
    }
    deleteProducto(id: number) {
      this.isDeleteInProgress = true;
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Correcto',
            detail: 'Producto eliminado',
          });
          this.isDeleteInProgress = false;
          this.listarProductos();
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el producto',
          });
        },
      });
    }
    addProducto():void{ 
      this.productoService.createProducto(this.producto).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Producto Registrado',
          });
          this.listarProductos();
          this.op=0;
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo Agregar el Producto',
          });
        },
      });    
      this.visible = false;
    }
    editProducto(){
      this.productoService.updateProducto(this.producto,this.producto.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Producto Editado',
          });
          this.listarProductos();
          console.log(this.producto.id+' '+this.producto.nombre+' '+this.producto.categoria+' '+this.producto.cantidad);
          this.op=0;
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo Editar el producto',
          });
        },
      });    
      this.visible = false;
    }
    opcion():void{
      if(this.op==0){
        this.addProducto();
        this.limpiar();
      }else if(this.op==1){
        console.log("Editar");
        this.editProducto();
        this.limpiar();
      }else{
        console.log("No se hace nada");
        this.limpiar();
      }
      
    }
   limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.producto.id=0;
    this.producto.nombre='';
    this.producto.categoria='';
    this.producto.cantidad='';
   }
  }