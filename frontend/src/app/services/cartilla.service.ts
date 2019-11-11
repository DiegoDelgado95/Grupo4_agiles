import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cartilla } from '../models/cartilla';

@Injectable({
  providedIn: 'root'
})
export class CartillaService {

  //Variable que contiene la base de la api
  API_URI = 'http://localhost:5000/api'

  //Le paso la variable http
  constructor(private http: HttpClient) { }

  //Obtengo todos los items de la cartilla 
  getCartilla(){
    return this.http.get(`${this.API_URI}/cartilla`);
  }

  //Obtengo todos los hospitales de la cartilla
  getHospitales(){
    return this.http.get(`${this.API_URI}/hospitales`);
  }

  //Obtengo todos las farmacias de la cartilla
  getFarmacias(){
    return this.http.get(`${this.API_URI}/farmacias`);
  }

  //Obtengo todos los medicamentos de la cartilla
  getMedicamentos(){
    return this.http.get(`${this.API_URI}/medicamentos`);
  }

  //Agrego un item a la cartilla
  saveItem(cartilla: Cartilla){
    return this.http.post(`${this.API_URI}/cartilla`, cartilla);
  }
}
