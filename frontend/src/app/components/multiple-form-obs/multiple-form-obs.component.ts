import { Component, OnInit } from '@angular/core';
import { Cartilla } from 'src/app/models/cartilla';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiple-form-obs',
  templateUrl: './multiple-form-obs.component.html',
  styleUrls: ['./multiple-form-obs.component.css']
})
export class MultipleFormOBSComponent implements OnInit {
  
  cartilla: Cartilla ={
  id: 0,
  tipo:'',
  nombre: '',
  direccion: '',
  is_element: 1,
  }

  


  constructor(private route:Router) { }

  ngOnInit() {
  }


}
