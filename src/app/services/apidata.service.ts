import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itrip } from '../models/itrip';
import { Firestore, query, where } from '@angular/fire/firestore';
import { environment } from '../environment/environments';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  DocumentData,
} from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class APIDataService {
  db = getFirestore();
  private httpOptions = {};
  categoryservices: any = [];

  constructor(private httpClient: HttpClient, private fs: AngularFirestore,
    ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    };
  }

  getAllTrips(): Observable<Itrip[]> {
    return this.httpClient.get<Itrip[]>(`${environment.BaseURL}`);
  }

  getAllTripsFirebase(): Observable<any[]> {
    return this.fs.collection('Trips').snapshotChanges();
  }

  getDataByCatID(catID: number): Observable<Itrip[]> {
    return this.httpClient.get<Itrip[]>(
      `${environment.BaseURL}?catID=${catID}`
    );
  }

  getSingleTripByID(itsID: string): Observable<Itrip> {
    return this.httpClient.get<Itrip>(`${environment.BaseURL}/${itsID}`);
  }

  

  getSingleTripByIDFirebase(id: string): any {
    this.fs
      .collection('Trips')
      .doc(id)
      .ref.get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          alert('There is no such trip! , try again later...');
        }
      });
  }
  addNewOne(newTrip: Itrip): Observable<Itrip> {
    return this.httpClient.post<Itrip>(
      `${environment.BaseURL}`,
      JSON.stringify(newTrip),
      this.httpOptions
    );
  }
  addNewTripFireBase(trip:Itrip){
   
    this.fs.collection("Trips").doc(this.fs.createId()).set(
     trip
    )
  }

  deleteTrip(tripId: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.BaseURL}/${tripId}`);
  }

  updateTrip(trip: Itrip, tripID: string): Observable<Itrip> {
    // return this.httpClient.put<Itrip>(`${environment.BaseURL}`, trip, this.httpOptions);
    return this.httpClient.put<Itrip>(
      `${environment.BaseURL}/${tripID}`,
      trip,
      this.httpOptions
    );
  }

  getTripsByCategoryIDFirebase(categoryID:number): Observable<Itrip[]>{
    const collection = this.fs.collection<Itrip>('Trips', ref => ref.where('catID', '==', categoryID))
const trip$ = collection
  .valueChanges()
  .pipe(
   
  );
  

return trip$;
  }


  
  
}
