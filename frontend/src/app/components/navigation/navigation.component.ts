import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isMedico:string='false';
  islogged:boolean=false;
  isAdmin:boolean=false;
  isUser:boolean=false;
  user:User;
  name:string=this._userService.getCurrentUserName();


  constructor(private _userService:UserService, private route:Router) { }

  ngOnInit() {
    this.checkUser();
  }

  logout(){
    localStorage.removeItem("user");
    setTimeout(function(){location.reload()}, 500)
    this.route.navigate(["/"])
  }


  checkUser():void{
      //Llamo al service para obtener el USER logeado
      if((this.user=this._userService.getCurrentUser()) != null){
        //Verifico si es MEDICO
        if (this.user.is_admin != '') {
          this.isMedico = this.user.is_admin;
        }
        if (this.user.username == 'admin') {
          this.isAdmin = true
        }
        if (this.user.is_admin == ''){
          this.isUser = true
        }
      } 
  }


  
}
