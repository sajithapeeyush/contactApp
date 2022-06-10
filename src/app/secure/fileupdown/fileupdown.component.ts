import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FileOperationService } from 'src/app/file-operation.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-fileupdown',
  templateUrl: './fileupdown.component.html',
  styleUrls: ['./fileupdown.component.css']
})
export class FileupdownComponent implements OnInit {
 
  public userFile:any=File;
  constructor(private authService:AuthService,private router:Router,private fileService:FileOperationService) { }

  ngOnInit(): void {
  }



  onSelectFile(event: any){
    const file=event.target.files[0];
    this.userFile=file;
    console.log(file);
    const formData = new FormData();
    formData.append('file',this.userFile); 
    
    this.fileService.upload(formData).subscribe((res)=>{
      console.log(res);
    }
      // event => {
      //   console.log(event);
      //   // this.resportProgress(event);
      // },
      // (error: HttpErrorResponse) => {
      //   console.log(error);
      // }
    );
    console.log(file);
  }

  // onUploadFiles(files: File): void {
  //   const formData = new FormData();
  //   formData.append('file',this.userFile); 
  //   this.fileService.upload(formData).subscribe(
  //     event => {
  //       console.log(event);
  //       // this.resportProgress(event);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }





 
  // onUploadFiles(files: File[]): void {
  //   const formData = new FormData();
  //   for (const file of files) { formData.append('files', file, file.name); }
  //   this.fileService.upload(formData).subscribe(
  //     event => {
  //       console.log(event);
  //       // this.resportProgress(event);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }


//   // define a function to download files
//   onDownloadFile(filename: string): void {
//     this.fileService.download(filename).subscribe(
//       event => {
//         console.log(event);
//         this.resportProgress(event);
//       },
//       (error: HttpErrorResponse) => {
//         console.log(error);
//       }
//     );
//   }

//   private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
//     switch(httpEvent.type) {
//       case HttpEventType.UploadProgress:
//         this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
//         break;
//       case HttpEventType.DownloadProgress:
//         this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
//         break;
//       case HttpEventType.ResponseHeader:
//         console.log('Header returned', httpEvent);
//         break;
//       case HttpEventType.Response:
//         if (httpEvent.body instanceof Array) {
//           this.fileStatus.status = 'done';
//           for (const filename of httpEvent.body) {
//             this.filenames.unshift(filename);
//           }
//         } else {
//           saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
//                   {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
//           // saveAs(new Blob([httpEvent.body!], 
//           //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
//           //    httpEvent.headers.get('File-Name'));
//         }
//         this.fileStatus.status = 'done';
//         break;
//         default:
//           console.log(httpEvent);
//           break;
      
//     }
//   }

//   private updateStatus(loaded: number, total: number, requestType: string): void {
//     this.fileStatus.status = 'progress';
//     this.fileStatus.requestType = requestType;
//     this.fileStatus.percent = Math.round(100 * loaded / total);
//   }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(_ => console.log('Logout'));
  }
}


