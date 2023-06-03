import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Itrip } from 'src/app/models/itrip';
import { APIDataService } from 'src/app/services/apidata.service';
declare var window: any;


@Component({
  selector: 'app-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss'],
})
export class SearchTripComponent implements OnInit,AfterViewChecked {
  notripsB:boolean=false
  searchValue: any;
  Trips: any[] = [];
  tripsToShow: any[] = [];
  test: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: APIDataService,
    private router:Router
  ) {
    this.activatedRoute.paramMap.subscribe((paraMap) => {
      this.searchValue = paraMap.get('tripName');
    this.service.getAllTripsFirebase().subscribe((data) => {
      this.Trips = data.map((ele) => {
        return {
          id: ele.payload.doc.id,
          ...ele.payload.doc.data(),
        };
      });
      for (let i = 0; i < this.Trips.length; i++) {
        let name=this.Trips[i].name.toUpperCase();
        let searchValueUpperCase=this.searchValue.toUpperCase();
        
        if (name.includes(searchValueUpperCase)) {
          if(!this.tripsToShow.includes(this.Trips[i]))
          this.tripsToShow.push(this.Trips[i]);
          this.notripsB=false
        }else{
         
        }
      }
    });
    if(this.tripsToShow=[]){
      this.notripsB=true
    }

  })}
  ngAfterViewChecked(): void {
  }
  ngOnInit(): void {
   
  }



  
  showDetails(idOfTrip:string){
    this.router.navigate(['singleTrip',idOfTrip])
    }

  
  
}
