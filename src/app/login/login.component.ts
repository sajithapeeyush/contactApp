

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


// export class MyErrorStateMatcher implements MyErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  ngOnInit(): void {
  }
  
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService){}
  
  // isLoadingResults=false;
  submit=false;
  username='';
  password='';
  loginForm=this.fb.group({
    username:[null,Validators.required],
    // email:['',Validators.required],
    password:[null,Validators.required]
  })
  get f(){
    return this.loginForm.controls
  }
  
  onsubmit(){
    this.submit=true
    console.log('clicked')

  
    // this.isLoadingResults = true;
    this.authService.login(this.loginForm.value)
      .subscribe(() => {
        //  this.isLoadingResults = false;
        this.router.navigate(['/secure']).then(_ => console.log('You are secure now!'));
      }, (err: any) => {
        console.log(err);
        // this.isLoadingResults = false;
      });

  }
}
