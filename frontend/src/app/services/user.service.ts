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

  //funcion para obtener los juegos de la api
  getUsers(){
    return this.http.get(`${this.API_URI}/users`);
  }

  getUser(id: string){
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  saveUser(user: User){
    return this.http.post(`${this.API_URI}/users`, user);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

  //Retorna un Obersable tipo Game, le indico que le id es tipo string o number
  //updateGame(id: string|number, updateGame: Game): Observable<Game> {
  // return this.http.put(`${this.API_URI}/games/${id}`, updateGame);
  //}
}
