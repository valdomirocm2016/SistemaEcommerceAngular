import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/login-guards';
import { LoginComponent } from './login/login/login.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    { 
        path: 'clientes',
        loadChildren: () => import('app/clientes/clientes.module').then(m => m.ClientesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'signin',
        component: LoginComponent
    }
];
export const RoutingModule = RouterModule.forRoot(routes);