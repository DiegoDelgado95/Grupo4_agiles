import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'orderform',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  user:User;
  orders:any=[];

  order:Order = {
    id: 0,
    data: '',
    estado: '',
    user_id:0,
    tipo: '',
    fecha: '',
  }
  constructor(private orderService: OrderService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  saveOrder(){
    this.user = JSON.parse( localStorage.getItem("user"));
    this.order.user_id = this.user.id;
    this.orderService.saveOrder(this.order).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
      )
    }
}

