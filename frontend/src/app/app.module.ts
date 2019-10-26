import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { VerOrdenComponent } from './components/ver-orden/ver-orden.component';
import { CommonModule } from '@angular/common';
import { MedicoModOrdComponent } from './components/medico-mod-ord/medico-mod-ord.component';
import { FormularioCargaMedicoComponent } from './components/formulario-carga-medico/formulario-carga-medico.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    NavigationComponent,
    HomeComponent,
    LoginFormComponent,
    OrderFormComponent,
    VerOrdenComponent,
    MedicoModOrdComponent,
    FormularioCargaMedicoComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
