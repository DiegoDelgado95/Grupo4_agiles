import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Servicio
import { UserService } from 'src/app/services/user.service';

//Interfaz
import { User } from 'src/app/models/user';

@Component({
  selector: 'loginform',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user:User={
    email: '',
    password: ''
  }


  constructor(private userService: UserService, private route:Router) { }

  ngOnInit() {
  }


  login():void {
    this.userService.setLogin(this.user)
    setTimeout(function(){location.reload()}, 600);
    this.route.navigate(["/"]);
  }
  
}
