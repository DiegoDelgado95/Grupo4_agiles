import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Service
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

//Interfaces
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { Medico } from 'src/app/models/medico';


@Component({
  selector: 'app-medico-mod-ord',
  templateUrl: './medico-mod-ord.component.html',
  styleUrls: ['./medico-mod-ord.component.css']
})
export class MedicoModOrdComponent implements OnInit {

  orders:any=[];
  modalMedico:Medico;

  modalUser:User={
    first_name:'',
    last_name:'',
    nro_afiliado:0,
    email:''
  }
  
  modalOrder:Order={
    estado: '',
    descuento:'',
    observacion: '',
    medico: '',
  }
  

  constructor(private _userService:UserService, private _orderService: OrderService, private router:Router) { }

  ngOnInit() {
    this.modalMedico = this._userService.getCurrentUser();
    this.getOrders()
  }


  //Obtengo TODAS la Ordenes para listar en la tabla
  getOrders(){
    this._orderService.getOrdersMed(this.modalMedico.nombre).subscribe(res => {
      this.orders = res
    },
    err => console.error(err)
    )
  }


  //Metodo para pasarle los datos al modal
  modOrder(id:number){
    //Obtengo los datos del medico logeado que modifica
    this.modalMedico = this._userService.getCurrentUser();

    //Obtengo los datos de la orden selecionado
    this._orderService.getOrder(id).subscribe(res =>{
      this.modalOrder = res

      //Al mismo tiempo Obtengo el User
      this._userService.getUser(this.modalOrder.user_id).subscribe(res => {
        this.modalUser = res
      },
      //Error User
      err => console.error(err)
      )
    },
    //Error Order
    err => console.error(err)
    )

  }

  //Editar una orden por el medico
  editOrderMedico(){
    this.modalOrder.medico = this.modalMedico.nombre
    this._orderService.updateOrder(this.modalOrder).subscribe(res => {
    },
      err => console.error(err)
    )
    setTimeout(function(){location.reload()}, 600);
  }

  notificarUser(){
    this._userService.notificarUser(this.modalUser).subscribe(res => {
    },
    err => console.error(err)
    )
  }

}
