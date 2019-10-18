import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-ver-orden',
  templateUrl: './ver-orden.component.html',
  styleUrls: ['./ver-orden.component.css']
})
export class VerOrdenComponent implements OnInit {

  user:User;
  orders:any=[];

  order:Order = {
    id: 0,
    data: '',
    estado: '',
    tipo: '',
    user_id: 0,
    fecha: '',
  }

  constructor(private orderService: OrderService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getOrders();
  }


  getOrders(){
    this.user = JSON.parse(localStorage.getItem("user"));
    this.orderService.getOrderUser(this.user.id).subscribe(
      res => {
        this.orders = res
        console.log(res)
      },
      err => console.error(err)
    )
  }

}
