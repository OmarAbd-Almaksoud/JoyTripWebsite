import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  email!:string;
  password!:string;
  userLoggedState:boolean;
UserAuthService: any;
constructor(public authService:UserAuthService){
 this.userLoggedState=(localStorage.getItem('token'))?true:false;


}
  ngOnInit(): void {
    this.authService.getUserLoggedState().subscribe(response=>{
this.userLoggedState=response;
    })
  }

  logOutState(){
   this.userLoggedState=false;
  }

}
