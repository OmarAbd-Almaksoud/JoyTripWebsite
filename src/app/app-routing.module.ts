import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FlightsComponent } from './components/flights/flights.component';
import { TransportationComponent } from './components/transportation/transportation.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SingleTripComponent } from './components/single-trip/single-trip.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddNewTripComponent } from './components/add-new-trip/add-new-trip.component';
import { UpdateTripComponent } from './components/update-trip/update-trip.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchTripComponent } from './components/search-trip/search-trip.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:OrderComponent},
  {path:'add',component:AddNewTripComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'trips',component:OrderComponent},
  {path:'signIn',component:SignInComponent},
  {path:'flights',component:FlightsComponent},
  {path:'transportation',component:TransportationComponent},
  {path:'register',component:RegisterComponent},
  {path:'singleTrip/:tid',component:SingleTripComponent},
  {path:'update/:tripID',component:UpdateTripComponent},
  {path:'search/:tripName',component:SearchTripComponent},
  {path:'**',component:NotFoundComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
