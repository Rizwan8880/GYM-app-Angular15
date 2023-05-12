import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
public baseURL :string ='http://localhost:3000/enquiry'
  constructor(private http :HttpClient) { }

  postRegisteredUser(registrOBJ:user){
    return this.http.post<user>(`${this.baseURL}`,registrOBJ)
  }

  getRegisteredUser(){
    return this.http.get<user[]>(`${this.baseURL}`)
  }

  updateRegisteredUser(registrOBJ:user ,id:number){
    return this.http.put<user>(`${this.baseURL}/${id}`,registrOBJ)
  }

  deleteRegisteredUser(id:number){
    return this.http.delete<user>(`${this.baseURL}/${id}`)
  }

  getRegisteredUserId(id:number){
    return this.http.get<user>(`${this.baseURL}/${id}`)

  }
}
