import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(private http:HttpClient) { }
  getUsers(data: any){
    return this.http.post<any>('http://localhost:8080/register',data)
  }
}
