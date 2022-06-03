import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/contact.service';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  message = '';
  // isLoadingResults = false;
  // public loading:boolean=false;
  public contacts:Array<any>=[];
  constructor(private fb:FormBuilder,private authService: AuthService, private router: Router,private cservice:ContactService) { }

  ngOnInit(): void {
    // this.loading=true
    // this.isLoadingResults = true;
    this.authService.secured()
      .subscribe((data: any) => {
        this.message = data;
        console.log(data);
        // this.isLoadingResults = false;
      });
      this.getContacts();
      this.cservice.viewContact().subscribe(data=>{
        console.log(data)
      })

  }
  addContactForm= this.fb.group({
    id:[''],
    name:['',Validators.required],
     email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required]]
   
    
  })
  
  // data={
  //   name:'',
  //    email:'',
  //   phone:''
  // }
  dataset={
    name:this.addContactForm.value.name,
    email:this.addContactForm.value.email,
    phone:this.addContactForm.value.phone
  }
  
   submit=false
   get f(){
     return this.addContactForm.controls;
   }
   onSubmit(){
    this.submit=true
    console.log('clicked')
    console.log('f',this.f)
    
    this.cservice.updateContact(this.dataset,this.addContactForm.value.id).subscribe((res)=>{
      console.log(res) ;
      this.getContacts();
      // this.router.navigate(['/secure']);
    
    });
  }
  public load(row:any){
   
   this.addContactForm.controls['id'].setValue(row.cId);
   this.addContactForm.controls['name'].setValue(row.name);
   this.addContactForm.controls['email'].setValue(row.email);
   this.addContactForm.controls['phone'].setValue(row.phone);
  }
public getContacts(){
  this.cservice.viewContact().subscribe((data:Array<any>)=>{
    this.contacts=data
    console.log(data)
  })

}

public deleteContacts(row:any){
  this.cservice.deleteContact(row.cId).
  subscribe(res=>{
    
  })
  this.getContacts()
  this.router.navigate(['/secure']);
}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }
}
