import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Medico } from '../../models/medico';


@Component({
  selector: 'app-formulario-prueba',
  templateUrl: './formulario-prueba.component.html',
  styleUrls: ['./formulario-prueba.component.css']
})
export class FormularioPruebaComponent implements OnInit {


  miFormulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.miFormulario = this.createFormGroup();
  }

  
  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])),
      cuit: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(30)])),
      matricula: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(30)])),
      correo: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(8), Validators.maxLength(8)])),
      hospital: new FormControl('', Validators.maxLength(15)),
      especialidad: new FormControl('')
    });
  }

  

  onSubmit() {

    console.log(this.miFormulario.value);
   

  }

  reset() {
    this.miFormulario.reset();
  }

  ngOnInit() { }
}

