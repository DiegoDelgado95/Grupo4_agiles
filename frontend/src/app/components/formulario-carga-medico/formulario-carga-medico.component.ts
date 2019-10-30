import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
    miFormulario: FormGroup;

  constructor(private cartillaService:CartillaService, 
              private route:Router, 
              private medicoService:MedicoService, 
              private formBuilder: FormBuilder) {this.miFormulario = this.createFormGroup();}

  ngOnInit() {
    this.getHospitales();
  }

  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      cuit: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(30)])),
      matricula: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(30)])),
      correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(8)])),
      hospital: new FormControl(this.medico.hospital, Validators.maxLength(30)),
      especialidad: new FormControl(this.medico.especialidad, Validators.maxLength(30))
    });
  }

  onSubmit() {
    console.log(this.miFormulario.value);
  }

  reset() {
    this.miFormulario.reset();
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

