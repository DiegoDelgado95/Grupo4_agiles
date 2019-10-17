import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { timeout } from 'q';

@Component({
  selector: 'loginform',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

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


  constructor(private userService: UserService, private route:Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
  }


  login(){
    //Debo cambiar la peticion para pedir user por mail and password
    this.userService.getLogin(this.user).subscribe(
      res => {
        this.user = res
        console.log(res)
        localStorage.setItem("user", JSON.stringify(this.user[0]))
      },
      err => console.error(err)
    )
   // this.route.navigate(["/"]);
    setTimeout(function(){location.reload(),this.route.navigate(["/"]); }, 500);
   // this.route.navigate(["/"]); 
    //location.reload();
  }


}
