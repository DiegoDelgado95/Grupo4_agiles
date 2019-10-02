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

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    NavigationComponent,
    HomeComponent,
    LoginFormComponent,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
