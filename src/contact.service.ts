import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpclient:HttpClient) { }
  addContact(data: any){
    return this.httpclient.post<any>('http://localhost:8080/my/addContact',data)
  }

  viewContact(){
    return this.httpclient.get<any>('http://localhost:8080/my/viewContact')
  }
updateContact(data:any,id:any){
  return this.httpclient.put<any>("http://localhost:8080/my/editContact/"+id,data)
}
  deleteContact(id:any){
    return this.httpclient.delete<any>('http://localhost:8080/my/deleteContact/'+id)
  }
}
