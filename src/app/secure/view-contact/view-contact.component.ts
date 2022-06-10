import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ngxCsv } from 'ngx-csv';
import { FileOperationService } from 'src/app/file-operation.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  



  form!: FormGroup;
  file!: File;
  constructor(private fb: FormBuilder,private http:HttpClient,
    private authService:AuthService,private router:Router,private fileService:FileOperationService) { }
  


  ngOnInit(): void {
    this.createForm();

}
createForm() {
  this.form = this.fb.group({
    file_upload: null
  });
}

 fileChange(event: any) {
  
  let reader = new FileReader();

  if(event.target.files && event.target.files.length > 0) {
   
    this.file = event.target.files[0];
  }
}



upload() {
  
  let body = new FormData();
 
  body.append("file", this.file);
 
  this.http.post('http://localhost:8080/my/upload', body)
  .subscribe(
    
    (data) => {console.log(data)},
    
    error => console.log(error),
    
    () => { console.log("completed") }
  );
}

downloadf() {
  
  let body = new FormData();
 
  body.append("file", this.file);
  
   new ngxCsv(this.file,"samplle")

//  this.fileService.download(this.file,body).subscribe((res))=>{
//    console.log(res);
 }

  // this.http.post('http://localhost:8080/my/upload', body)
  // .subscribe(
    
  //   (data) => {console.log(data)},
    
  //   error => console.log(error),
    
  //   () => { console.log("completed") }
  // );




  // define a function to download files
  // onDownloadFile(filename: string): void {
  //   this.fileService.download(filename).subscribe(
  //     event => {
  //       console.log(event);
        
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }






logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']).then(_ => console.log('Logout'));
}

}