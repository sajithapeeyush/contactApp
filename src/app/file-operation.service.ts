import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileOperationService {
private server='localhost:8080';
  constructor(private http:HttpClient) { }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<any>('http://localhost:8080/my/upload',formData)
    // return this.http.post<string[]>(`${this.server}/my/upload`, formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // });
  }

  // define function to download files
  // download(filename: string,formData: FormData): Observable<any> {

  //   return this.http.get<any>('http://localhost:8080/my/download/'+filename,formData)
  //   // return this.http.get(`${this.server}/my/download/${filename}/`, {
  //   //   reportProgress: true,
  //   //   observe: 'events',
  //   //   responseType: 'blob'
  //   // });
  // }
  
}

