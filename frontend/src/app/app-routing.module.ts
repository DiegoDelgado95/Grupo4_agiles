import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { VerOrdenComponent } from "./components/ver-orden/ver-orden.component";
import { MedicoModOrdComponent } from './components/medico-mod-ord/medico-mod-ord.component';
import { FormularioCargaMedicoComponent } from './components/formulario-carga-medico/formulario-carga-medico.component';
import { MultipleFormOBSComponent } from './components/multiple-form-obs/multiple-form-obs.component'


const routes: Routes = [
  { path: '',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'order',
    component: OrderFormComponent
  },
  {
    path: 'verorden',
    component: VerOrdenComponent
  },
  {
    path: 'verMed',
    component: MedicoModOrdComponent
  },
  {
    path: 'formularioMed',
    component: FormularioCargaMedicoComponent
  },
  {
    path: 'cartilla',
    component: MultipleFormOBSComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }