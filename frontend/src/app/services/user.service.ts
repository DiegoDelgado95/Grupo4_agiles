import { Injectable } from '@angular/core';
//Modulo para pedir peticiones
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Variable que contiene la base de la api
  API_URI = 'http://localhost:5000/api'

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

  deleteUser(id: string){
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

  getLogin(user: User){
    return this.http.post(`${this.API_URI}/user/login`, user);
  }
  
}
