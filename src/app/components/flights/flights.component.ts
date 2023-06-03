import { Component } from '@angular/core';
import { APIDataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  trip:any;
  constructor(private service:APIDataService){
this.service.getAllTripsFirebase().subscribe(data=>{
  this.trip=data.map((ele) => {
    return {
      id: ele.payload.doc.id,
      ...ele.payload.doc.data(),
    };
  });
  console.log(this.trip);
  
  
})


  }

}
