import { Routes } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        title: 'home'
    },
    { 
        path: 'prod', 
        component: ProductoComponent, 
        title: 'producto'
    },
    { 
        path: 'clien', 
        component: ClienteComponent, 
        title: 'cliente'
    },
    { 
        path: '**', 
        redirectTo: '',
    pathMatch: 'full'
    }
];
