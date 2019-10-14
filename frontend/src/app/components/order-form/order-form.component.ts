import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private orderService: OrderService, private router:Router, private activedRoute:ActivatedRoute, private http: HttpClient) { }

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
  
  //Cargar imagen
  selectedFile: File = null;

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  subirArchivo(){
    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:5000/api/img',fd)
      .subscribe(res => {
        console.log(res);         
      });
  }
  

}

