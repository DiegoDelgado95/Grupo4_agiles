import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-orden',
  templateUrl: './ver-orden.component.html',
  styleUrls: ['./ver-orden.component.css']
})
export class VerOrdenComponent implements OnInit {

  test:Boolean=true;
  orders:any=[];

  order:Order = {
    id: 0,
    data: '',
    estado: '',
    tipo: '',
    user: '',
    fecha: '',
  }

  constructor(private orderService: OrderService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    //this.getOrders();
  }


  getOrders(){
    this.orderService.getOrders().subscribe(
      res => {
        this.order = res
      },
      err => console.error(err)
    )
  }

}
