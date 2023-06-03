import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userFormGroup:FormGroup

  constructor( private formBuilder:FormBuilder, public authService:UserAuthService){
// this.userFormGroup=new FormGroup({
//   fullName:new FormControl('',[Validators.required,Validators.minLength(3)]),
//   email:new FormControl('',[Validators.required,Validators.email,]),
//   password:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
//   address:new FormGroup({
//     city:new FormControl('',[Validators.required]),
//     street:new FormControl('',[Validators.required]),
//     details:new FormControl('',[Validators.required])
//   })
// })


this.userFormGroup=this.formBuilder.group({
  fullName:['',[Validators.required,Validators.minLength(3)]],
  email:['',[Validators.required,Validators.email,]],
  password:['',[Validators.required,Validators.minLength(5),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]],
  address:formBuilder.group({
    city:['',[Validators.required]],
    street:['',[Validators.required]],
    details:['',[Validators.required]]
  }),
   mobileNum:formBuilder.array([formBuilder.control('')])
})




  }

  get email(){
    return this.userFormGroup.get('email');
  }
  get password(){
    return this.userFormGroup.get('password');
  }
  get MobileNum(){
    return this.userFormGroup.get('mobileNum') as FormArray;
  }
  addMobileNum(){
this.MobileNum.push(this.formBuilder.control(''))
  }
  signUp(email:any,password:any){
    this.authService.SignUp(email,password)
  }
  GoogleAuth(){
    this.authService.GoogleAuth()
  }
  
}
