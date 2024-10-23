import { Routes } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { HomeComponent } from './home/home.component';

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
        path: '**', 
        redirectTo: '',
    pathMatch: 'full'
    }
];
