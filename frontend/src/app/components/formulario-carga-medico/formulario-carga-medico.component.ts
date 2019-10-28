import { Component, OnInit } from '@angular/core';
import { CartillaService } from 'src/app/services/cartilla.service';
import { Medico } from 'src/app/models/medico';
import { Router } from '@angular/router';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-formulario-carga-medico',
  templateUrl: './formulario-carga-medico.component.html',
  styleUrls: ['./formulario-carga-medico.component.css']
})
export class FormularioCargaMedicoComponent implements OnInit {
  hospitales:any=[];
  medico: Medico ={
    nombre: '',
    cuit:'',
    matricula: '',
    hospital: '',
    correo: '',
    especialidad: '',
    password: ''
    }
  constructor(private cartillaService:CartillaService, private route:Router, private medicoService:MedicoService) { }

  ngOnInit() {
    this.getHospitales();
  }
  saveNewMedico(){
    this.medicoService.saveMedico(this.medico).subscribe(
      res => {
        console.log(res);
        alert("Medico cargado con exito");
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
