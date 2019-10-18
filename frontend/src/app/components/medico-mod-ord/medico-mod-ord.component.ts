import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router, RouteConfigLoadEnd } from '@angular/router';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medico-mod-ord',
  templateUrl: './medico-mod-ord.component.html',
  styleUrls: ['./medico-mod-ord.component.css']
})
export class MedicoModOrdComponent implements OnInit {

  orders:any=[];
  modalUser:User;
  modalMedico:User;

  modalOrder:Order={
    estado: '',
    descuento:'',
    observacion: '',
    medico_id: 0,
  }
  

  constructor(private _userService:UserService, private _orderService: OrderService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getOrders()
  }


  //Obtengo TODAS la Ordenes para listar en la tabla
  getOrders(){
    this._orderService.getOrders().subscribe(res => {
      this.orders = res
      console.log(res)
    },
    err => console.error(err)
    )
  }


  //Metodo para pasarle los datos al modal
  modOrder(id:number){
    //Obtengo los datos del medico logeado que modifica
    this.modalMedico = JSON.parse( localStorage.getItem("user"));

    //Obtengo los datos de la orden selecionado
    this._orderService.getOrder(id).subscribe(res =>{
      this.modalOrder = res
      console.log(res)
    },
    err => console.error(err)
    )

    //Obtengo los datos del paciente
    this._userService.getUser(this.modalOrder.user_id).subscribe(res => {
      this.modalUser = res
      console.log(res)
    },
    err => console.error(err)
    )
  }

  //Editar una orden por el medico
  editOrderMedico(){
    this.modalOrder.medico_id = this.modalMedico.id
    this._orderService.updateOrder(this.modalOrder).subscribe(res => {
      console.log(res)
    },
      err => console.error(err)
    )
    console.log(this.modalOrder)
    this.router.navigate(["/verMed"])
  }


}
