import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Itrip } from 'src/app/models/itrip';
import { APIDataService } from 'src/app/services/apidata.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
declare var window: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  arrayOfTrips:Itrip[]=[];
  formModal: any;
  userLoggedState!:boolean;

constructor(private router:Router, private serviceAPI:APIDataService, public authService:UserAuthService){
authService.getUserLoggedState().subscribe((data)=>{
  this.userLoggedState=data;
})
}
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
searchTrip(trip:string){
this.router.navigate(['search',trip])
  
  
}
logOut(){
  this.userLoggedState=false;
}
handelCreateAccount(){
  this.userLoggedState=true;

}




}
