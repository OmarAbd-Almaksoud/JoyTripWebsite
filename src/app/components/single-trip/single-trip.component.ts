import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Itrip } from 'src/app/models/itrip';
import { APIDataService } from 'src/app/services/apidata.service';
declare var window: any;

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.scss'],
})
export class SingleTripComponent implements OnInit {
  formModal: any;
  tripId: any;
  singleTrip: any ;
  arrayOFIds: any[] = [];
  arrayOfTrips: Itrip[] = [];
  currentIndex: number = 0;
  theAiemedID: string = '';
  loader: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private APIservice: APIDataService,
    private fs: AngularFirestore
  ) {
    this.APIservice.getAllTripsFirebase().subscribe((data) => {
      this.arrayOfTrips = data.map((ele) => {
        this.loader = false;
        return {
          id: ele.payload.doc.id,
          ...ele.payload.doc.data(),
        };
      });
      this.arrayOFIds = this.arrayOfTrips.map((trip) => trip.id);
      console.log(this.arrayOFIds);
    });

    //SnapShot inside activatedRoute service takes a single shot to it but we need to track any change
    // this.tripId= this.activatedRoute.snapshot.paramMap.get('tid');
    this.activatedRoute.paramMap.subscribe((paraMap) => {
      this.tripId = paraMap.get('tid');
      this.arrayOFIds.includes(this.tripId);
      // this.APIservice.getSingleTripByIDFirebase(this.tripId).subscribe((data: Itrip | undefined) => {
      //   this.loader = false;
      //   this.singleTrip = data;
      // });
      this.fs
        .collection('Trips')
        .doc(this.tripId)
        .ref.get()
        .then( (doc) => {
          if (doc.exists) {
            this.singleTrip=doc.data();
           
          } else {
            alert('There is no such trip! , try again later...');
          }
        });
    });
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  goNextFunc() {
    this.currentIndex = this.arrayOFIds.findIndex(
      (item) => item == this.tripId
    );
    this.router.navigate(['singleTrip', this.arrayOFIds[++this.currentIndex]]);
  }

  goPrevFunc() {
    this.currentIndex = this.arrayOFIds.findIndex(
      (item) => item == this.tripId
    );
    this.router.navigate(['singleTrip', this.arrayOFIds[--this.currentIndex]]);
  }
}
