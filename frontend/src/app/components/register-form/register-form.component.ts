import { Component, OnInit, HostBinding } from '@angular/core';
//Importo el modelo de objeto
import { User } from 'src/app/models/user';
//Import el servicio
import { UserService } from '../../services/user.service'
//Import para recibir los parametros por url y navegar atravez por angular
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'registerform',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  //El componente esta dentro de un row
  @HostBinding('class') classes = "row";

  user: User ={
    id:0,
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    nro_afiliado:0,
    telefono: '',
    ciudad: '',
    estado_civil: '',
    direccion: ''
  };

  constructor(private userService: UserService, private route:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  saveNewUser(){
    this.userService.saveUser(this.user).subscribe(
      res => {
        console.log(res)
        this.route.navigate(['/login']);
      },
      err => console.error(err)
    )
  }
}

