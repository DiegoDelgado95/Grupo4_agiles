import { Component, OnInit } from '@angular/core';
import { CartillaService } from 'src/app/services/cartilla.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-ver-cartilla',
  templateUrl: './ver-cartilla.component.html',
  styleUrls: ['./ver-cartilla.component.css']
})
export class VerCartillaComponent implements OnInit {
  hospitales:any=[];
  farmacias:any=[];
  medicamentos:any=[];
  medicos:any=[];
  constructor(private cartillaService:CartillaService, private medicoService:MedicoService) { }

  ngOnInit() {
    this.getHospitales();
    this.getFarmacias();
    this.getMedicamentos();
    this.getMedicos();
  }

  getHospitales(){
    this.cartillaService.getHospitales().subscribe(res => {
      this.hospitales = res
    },
    err => console.error(err)
    )
  }
  getFarmacias(){
    this.cartillaService.getFarmacias().subscribe(res => {
      this.farmacias = res
    },
    err => console.error(err)
    )
  }
  getMedicamentos(){
    this.cartillaService.getMedicamentos().subscribe(res => {
      this.medicamentos = res
    },
    err => console.error(err)
    )
  }
  getMedicos(){
    this.medicoService.getMedicos().subscribe(res => {
      this.medicos = res
    },
    err => console.error(err)
    )
  }
}
