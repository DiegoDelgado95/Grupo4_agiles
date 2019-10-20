import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //Variable que contiene la base de la api
  API_URI = 'http://localhost:5000/api'

  //Le paso la variable http
  constructor(private http: HttpClient) { }

  //Obtengo todas las ordenes
  getOrders(){
    return this.http.get(`${this.API_URI}/order`);
  }

  //Obtengo todas las ordenes del usuario logeado
  getOrderUser(id:number){
    return this.http.get(`${this.API_URI}/orders/${id}`);
  }

  //Obtengo una orden por id
  getOrder(id: number){
    return this.http.get(`${this.API_URI}/order/${id}`);
  }

  //Agrego una orden
  saveOrder(order: Order){
    return this.http.post(`${this.API_URI}/order`, order);
  }

  //Elimio una orden por id
  deleteOrder(id: number){
    return this.http.delete(`${this.API_URI}/order/${id}`);
  }

  //Edito una orden modificado por el medico
  updateOrder(order: Order){
    return this.http.put(`${this.API_URI}/order`, order)
  }
  
}
