import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';
import { Itrip } from 'src/app/models/itrip';
import { APIDataService } from 'src/app/services/apidata.service';
declare var window: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  arrayForTrips: Itrip[] = [];
  trip: Itrip | undefined;
  formModal: any;
  confirmDeletingBoolean: boolean = false;
  tripID: any;
  constructor(
    private APIservice: APIDataService,
    private router: Router,
    private location: Location,
    private afs: AngularFirestore
  ) {
    this.APIservice.getAllTripsFirebase().subscribe((data) => {
      this.arrayForTrips = data.map((ele) => {
        return {
          id: ele.payload.doc.id,
          ...ele.payload.doc.data(),
        };
      });
    });
  }
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('warningModal')
    );
  }

  goToAddingNewOne() {
    this.router.navigate(['add']);
  }

  confirmDeleting() {
    this.confirmDeletingBoolean = true;
    if (this.confirmDeletingBoolean) {
      // this.APIservice.deleteTrip(this.tripID).subscribe((value) =>
      //   console.log(value)
      // );
      // window.location.reload();\

      //we should delete here
      this.afs.collection('Trips').doc(this.tripID).delete();
    }
  }
  deleteTrip(tripID: string) {
    this.formModal.show();
    this.tripID = tripID;
  }

  updateTrip(tripID: string) {
    this.router.navigate(['update', tripID]);
  }
}
