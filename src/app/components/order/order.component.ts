import { Component, ViewChild } from '@angular/core';
import { Icategory } from 'src/app/models/icategory';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @ViewChild(HomeComponent) homeRef!:HomeComponent;
  recivedTotalPriceFromChild:number=0;
  Icategory:Icategory[];
  choosenCatId:number=0;
  constructor(){
    this.Icategory=[
      {id:1,name:"ADVENTURE"},
      {id:3,name:"WATER ACTIVITY"},  
    ]
  }


  // Reminder: The total price is sended from child component by event to display it in parent 
  funcToRunTheEvent(totalPriceFromChild:number){
this.recivedTotalPriceFromChild=totalPriceFromChild;

  }
  showCatIDFromOrder(){
this.homeRef.formModal.show();
  }

}
