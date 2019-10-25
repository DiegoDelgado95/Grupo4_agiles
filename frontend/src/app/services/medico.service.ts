import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  //Variable que contiene la base de la api
  API_URI = 'http://localhost:5000/api'

  //Le paso la variable http
  constructor(private http: HttpClient) { }

  //Obtengo todos los medicos
  getMedicos(){
    return this.http.get(`${this.API_URI}/medicos`);
  }

  //Agrego un nuevo medico
  saveItem(medico: Medico){
    return this.http.post(`${this.API_URI}/medicos`, medico);
  }
}
