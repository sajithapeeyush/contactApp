import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ContactService } from 'src/contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  constructor(private fb:FormBuilder,private contactService:ContactService,
    private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
  }
  addContactForm= this.fb.group({
    
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required]]
   
    
  })
  

  data={
   
   name:'',
   email:'',
   phone:''
   
  }
  submit=false
  get f(){
    return this.addContactForm.controls;
  }
  onSubmit(){
    this.submit=true
    console.log('clicked')
    console.log('f',this.f)
    this.contactService.addContact(this.data).subscribe((res)=>{
      console.log(res) 
      this.router.navigate(['/secure']);
    });
    
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }
}
