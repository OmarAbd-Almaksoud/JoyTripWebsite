import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FlightsComponent } from './components/flights/flights.component';
import { TransportationComponent } from './components/transportation/transportation.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { CardDirectiveDirective } from './directives/card-directive.directive';
import { EGPtoDollarsPipe } from './Pipes/egpto-dollars.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { AddNewTripComponent } from './components/add-new-trip/add-new-trip.component';
import { UpdateTripComponent } from './components/update-trip/update-trip.component';
import { getAnalytics } from "firebase/analytics";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environmentFirebase } from './environment/environments';
import{AngularFireModule} from '@angular/fire/compat';
import{AngularFireAuthModule} from '@angular/fire/compat/auth';
import { UserAuthService } from './services/user-auth.service';
import { SearchTripComponent } from './components/search-trip/search-trip.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    SignInComponent,
    FlightsComponent,
    TransportationComponent,
    RegisterComponent,
    NotFoundComponent,
    SingleTripComponent,
    CardDirectiveDirective,
    EGPtoDollarsPipe,
    AdminComponent,
    AddNewTripComponent,
    UpdateTripComponent,
    SearchTripComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
