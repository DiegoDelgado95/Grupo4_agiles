import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil2',
  templateUrl: './perfil2.component.html',
  styleUrls: ['./perfil2.component.css']
})
export class Perfil2Component implements OnInit {

  user: User={
    id:0,
    email: '',
    first_name: '',
    last_name: '',
    nro_afiliado:0,
    telefono: '',
    ciudad: '',
    estado_civil: '',
    direccion: '',
     
  }


  constructor(private _User:UserService) { }

  ngOnInit() {
   this.informacion();
  }

  informacion() {
   this.user=this._User.getCurrentUser();

  }
  
  updateUser(){
     this._User.updateUser(this.user).subscribe(
       res => {
         console.log(res)
       },
       err => console.error(err)
     )
  }
}
