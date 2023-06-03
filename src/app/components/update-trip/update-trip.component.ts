import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Itrip } from 'src/app/models/itrip';
import { APIDataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.scss'],
})
export class UpdateTripComponent {
  Trip!: any;
  tripId: any;

  constructor(
    private service: APIDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private afs: AngularFirestore
  ) {
    this.tripId = activatedRoute.snapshot.paramMap.get('tripID');
    this.afs
      .collection('Trips')
      .doc(this.tripId)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          this.Trip = doc.data();
        } else {
          alert('There is no such trip! , try again later...');
        }
      });
    
  }

  updateTrip() {
    // this.service.updateTrip(this.Trip,this.tripId).subscribe(data=>{
    //   console.log(data);

    // })
    // this.router.navigate(['admin']);
    this.afs.collection('Trips').doc(this.tripId).set(this.Trip);
    this.router.navigate(['admin']);
  }
  getBack() {
    this.location.back();
  }
}
