import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/services/order.service';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ver-orden',
  templateUrl: './ver-orden.component.html',
  styleUrls: ['./ver-orden.component.css']
})
export class VerOrdenComponent implements OnInit {

  user:User;
  orders:any=[];

  constructor(private orderService: OrderService, private userService:UserService) { }

  ngOnInit() {
    this.getOrders();
  }


  getOrders(){
    //Obtengo el USER logeado
    this.user = this.userService.getCurrentUser();
    //Obtengo todas las ORDENES del USER logeado
    this.orderService.getOrderUser(this.user.id).subscribe(
      res => {
        this.orders = res
      },
      err => console.error(err)
    )
  }

}
