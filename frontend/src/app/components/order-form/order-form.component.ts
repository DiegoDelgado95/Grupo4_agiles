import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient, private orderService: OrderService, private router:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  saveOrder1(){
    this.user = JSON.parse( localStorage.getItem("user"));
    this.order.user_id = this.user.id;
    this.orderService.saveOrder(this.order).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
      )
    }
  selectedFile: File = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('tipo', this.order.tipo)
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    fd.append('user_id', (this.user.id).toString());
    this.http.post('http://localhost:5000/api/order', fd).subscribe (res =>{
      console.log(res);
    });
  }
}

