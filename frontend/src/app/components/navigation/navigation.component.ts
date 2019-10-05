import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user:User={
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
    direccion: '',
    is_admin: '',
  }

  constructor() { }

  ngOnInit() {
    let user = JSON.parse( localStorage.getItem("user"));
  }

}
