import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServService } from 'src/serv.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  

  ngOnInit(): void {
  }
  constructor(private fb:FormBuilder,private userService:ServService){}
  submit=false
  registrationForm=this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
  get f(){
    return this.registrationForm.controls
  }
  data={
    name:'',
    password:'',
    username:''
  }
  onsubmit(){
    this.submit=true
    console.log('clicked')
    
    this.userService.getUsers(this.data).subscribe((res)=>{
      console.log(res)
    })
    

  }
}
