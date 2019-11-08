import { Injectable } from '@angular/core';
//Modulo para pedir peticiones
import { HttpClient } from '@angular/common/http';

import { isNullOrUndefined } from 'util';

//Modal interfaz
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Variable que contiene la base de la api
  API_URI = 'http://localhost:5000/api'

  _user:User;

  //Le paso la variable httpclient
  constructor(private http: HttpClient ) { }

  getUsers(){
    return this.http.get(`${this.API_URI}/users`);
  }

  getUser(id: number){
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  saveUser(user: User){
    return this.http.post(`${this.API_URI}/users`, user);
  }

  updateUser(user: User){
    return this.http.put(`${this.API_URI}/users`, user);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

  //Login y Logout, set y remove del localStorage
  getLogin(user: User){
    return this.http.post(`${this.API_URI}/user/login`, user);
  }

  //Guarda el user en el localStorage del navegador
  setLogin(user: User){
    this.getLogin(user).subscribe( res => {
      this._user = res
      console.log(res)
      if (JSON.stringify(this._user[0])){
        localStorage.setItem("user", JSON.stringify(this._user[0]))
      } else {
        alert("Error: Ese usuario no existe");
      }
    },
      error => console.error(error)
    )
  }

  //Obtener el user guardado en localStorage
  getCurrentUser(){
    let user_string = localStorage.getItem("user");
    if(!isNullOrUndefined(user_string)){
      this._user = JSON.parse(user_string);
      return this._user;
    }else{
      return null;
    }
  }

  getCurrentUserName(){
    let user_string = localStorage.getItem("user");
    if(!isNullOrUndefined(user_string)){
      this._user = JSON.parse(user_string);
      return "Hi, " + this._user.first_name + "!";
    }else{
      return null;
    }    
  }
  
}
