import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  ejemplo:Boolean=true;
  isMedico:string='false';
  //isLogin:User;
  

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
    is_admin: 'false',
  }

  constructor() { }

  ngOnInit() {
    //Busco en localStorage el user que le logeo
    this.user = JSON.parse( localStorage.getItem("user"));
    if (this.user.is_admin == '') {
      this.isMedico='false'
    } else {
      this.isMedico = this.user.is_admin;
    }
  }

  logout(){
    localStorage.removeItem("user");
    setTimeout(function(){location.reload(),this.route.navigate(["/"]); }, 500)
  }

}
