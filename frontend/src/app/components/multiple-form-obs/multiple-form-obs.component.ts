import { Component, OnInit } from '@angular/core';
import { Cartilla } from 'src/app/models/cartilla';
import { Router } from '@angular/router';
import { CartillaService } from 'src/app/services/cartilla.service';

@Component({
  selector: 'app-multiple-form-obs',
  templateUrl: './multiple-form-obs.component.html',
  styleUrls: ['./multiple-form-obs.component.css']
})
export class MultipleFormOBSComponent implements OnInit {
  
  hospitales:any=[];
  cartilla: Cartilla ={
  id: 0,
  tipo:'',
  nombre: '',
  direccion: '',
  telefono: '',
  }

  constructor(private cartillaService:CartillaService, private route:Router) { }

  ngOnInit() {
    this.getHospitales();
  }

  saveNewItem(){
    this.cartillaService.saveItem(this.cartilla).subscribe(
      res => {
        console.log(res);
        alert("Item cargado con exito");
        this.route.navigate(['/']);
      },
      err => console.error(err)
    )
  }

  getHospitales(){
    this.cartillaService.getHospitales().subscribe(res => {
      this.hospitales = res
    },
    err => console.error(err)
    )
  }

}
