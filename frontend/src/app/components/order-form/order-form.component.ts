import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'orderform',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  test:Boolean=true;
  orders:any=[];

  order:Order = {
    id: 0,
    data: '',
    estado: '',
    user:'',
    tipo: '',
    fecha: '',
  }
  constructor(private orderService: OrderService, private router:Router, private activedRoute:ActivatedRoute) { }


  ngOnInit() {
  }

  saveOrder(){
    this.orderService.saveOrder(this.order).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
      )
    }
}

