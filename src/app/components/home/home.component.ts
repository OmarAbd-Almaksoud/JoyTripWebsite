import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Itrip } from 'src/app/models/itrip';
import { OrderComponent } from '../order/order.component';
import { Router } from '@angular/router';
import { APIDataService } from 'src/app/services/apidata.service';
declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnChanges,AfterViewInit{
  formModal: any;
  formModal2:any;
  formModal3:any;
  formModal4:any;
  tripsOfCart:any[]=[];
  numOfTicketsInCart:number=0;
  loader:boolean=true;
  showArrowPro:boolean=false;
  tabel:boolean=true;
  test:number=0;

  //Declare the event 
  @Output() updateTotalPriceEvent:EventEmitter<number>;
  singleTrip!:Itrip;
  totalPrice:number=0;
  @Input() returnedCatId:number=0;
  tripsFromCatId:Itrip[]=[];
  testtripsOfCat:Itrip[]=[];
  arrayOfTrips:Itrip[]=[];
  //ViewChild to set a value From HTML in class component here
  @ViewChild('nameOfTrip') trip!:ElementRef;


  constructor( private router:Router,private serviceAPI:APIDataService){
 
  // this.serviceAPI.getAllTrips().subscribe(data=>{
  //   this.arrayOfTrips==data;
      
  //   })
  this.serviceAPI.getAllTripsFirebase().subscribe(data=>{
    this.arrayOfTrips=data.map((ele) => {
      return {
        id: ele.payload.doc.id,
        ...ele.payload.doc.data(),
      };
    });
  })
   
    
    
    //Assign the event 
    this.updateTotalPriceEvent=new EventEmitter<number>;
    
  }


  ngAfterViewInit(): void {
  }
  
  
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.formModal2=new window.bootstrap.Modal(
      document.getElementById('myModal2')
    );
    this.formModal3=new window.bootstrap.Modal(
      document.getElementById('myModal3')
    );
    this.formModal4=new window.bootstrap.Modal(
      document.getElementById('myModal4')
    );
    
  }
  ngOnChanges(): void {
    this.filterTheChoosenTripsByCatID();
  }

  private filterTheChoosenTripsByCatID(){
    if(this.returnedCatId==0){
     this.serviceAPI.getAllTripsFirebase().subscribe(data=>{
      this.tripsFromCatId=data.map((ele) => {
        this.loader=false;
        return {
          id: ele.payload.doc.id,
          ...ele.payload.doc.data(),
        };
      });      
    })
    }else{
      // this.serviceAPI.getDataByCatID(this.returnedCatId).subscribe(data=>{
      //   this.loader=false;
      //   this.tripsFromCatId=data;
      // })   
      this.serviceAPI.getDataByCatID(+this.returnedCatId).subscribe(data=>{
        this.tripsFromCatId=data;
        
      })

    }
   
   
  }
  

  buyingMyItem(tripID:string,tickets:number,price:number,numberOfTicketsYouWaNT:any){
    //Checking if the number of tickets which client wants is bigger than offered
    if(numberOfTicketsYouWaNT>tickets){
      // alert("Sorry, the available number of tickets is only "+tickets) 
      this.formModal.show();

    }else if(numberOfTicketsYouWaNT<0){
          //Checking if the value of number is positive 
      this.formModal2.show();
    }else{
      //Decrease the total tickets of the single trip
      for (let i = 0; i < this.arrayOfTrips.length; i++) {
        if(this.arrayOfTrips[i].id==tripID){
        this.arrayOfTrips[i].tickets=this.arrayOfTrips[i].tickets-numberOfTicketsYouWaNT;
        }  
      }
      //Update total Price
      if(numberOfTicketsYouWaNT==0){
        this.showArrowPro=false;
       this.formModal3.show();
      }else{
        this.showArrowPro=true;
      }
      
    }
  }


  showDetails(idOfTrip:string){
  this.router.navigate(['singleTrip',idOfTrip])
  }


  handelCart(trip:Itrip,numOfTickets:string){
  if(numOfTickets){
    trip.numberOfTripsYouWanna=parseInt(numOfTickets)
    if(this.tripsOfCart.includes(trip)){
this.tripsOfCart[this.tripsOfCart.indexOf(trip)]=trip


    }else{
      this.tripsOfCart.push(trip);
    }
  
  }
  }


  deleteItem(tripID:string,numOfTickets:number){

    let num=0;
    //first step removing item from an array
    this.tripsOfCart=this.tripsOfCart.filter((trip)=>{
      if(trip.id==tripID){
        num=trip.price*numOfTickets;
      }
      return trip.id!=tripID
    })

    //second step decreasing the total price

this.totalPrice=this.totalPrice-num;
 //Fire the event of updating total price
 this.updateTotalPriceEvent.emit(this.totalPrice);
  }

  CalcTotalPrice(){
   
    if(this.totalPrice==0){
      for (let index = 0; index < this.tripsOfCart.length; index++) {
        this.totalPrice+=this.tripsOfCart[index].price*this.tripsOfCart[index].numberOfTripsYouWanna
        }
       if(this.totalPrice==0){
        this.formModal4.show();
       }
        
        //Fire the event of updating total price
        this.updateTotalPriceEvent.emit(this.totalPrice);
    }else{ 
      this.totalPrice=0;
      for (let index = 0; index < this.tripsOfCart.length; index++) {
        this.totalPrice+=this.tripsOfCart[index].price*this.tripsOfCart[index].numberOfTripsYouWanna
        }
       
        
        //Fire the event of updating total price
        this.updateTotalPriceEvent.emit(this.totalPrice);
    }

  }

  
  
}
