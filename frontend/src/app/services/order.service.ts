import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //Variable que contiene la base de la api
  public API_URI = 'http://localhost:5000/api';

  //Le paso la variable http
  constructor(private http: HttpClient) { }

  getOrders(){
    return this.http.get(`${this.API_URI}/order`);
  }

  getOrder(id: string){
    return this.http.get(`${this.API_URI}/order/${id}`);
  }

  saveOrder(order: Order){
    return this.http.post(`${this.API_URI}/order`, order);
  }

  deleteOrder(id: string){
    return this.http.delete(`${this.API_URI}/order/${id}`);
  }

  public postFileImagen(imagenParaSubir: File){

		const formData = new FormData(); 
		formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name); 
		return this.http.post(this.API_URI, formData);

	}

}
