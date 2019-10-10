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


    //Carga Imagen
    public respuestaImagenEnviada;
    public resultadoCarga;
    public cargandoImagen(files: FileList){

      this.orderService.postFileImagen(files[0]).subscribe(
  
        response => {
          this.respuestaImagenEnviada = response; 
          if(this.respuestaImagenEnviada <= 1){
            console.log("Error en el servidor"); 
          }else{
  
            if(this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success"){
  
              this.resultadoCarga = 1;
  
            }else{
              this.resultadoCarga = 2;
            }
  
          }
        },
        error => {
          console.log(<any>error);
        }
  
      )
  
    }


}

