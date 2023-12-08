import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  userRegister(payload:any){
    return this.http.post(`http://localhost:3000/portfolio/register`,payload)
  }
  logIn(payload:any){
    return this.http.post(`http://localhost:3000/portfolio/login`,payload)
  }
  getToken(){
    var getToken=localStorage.getItem('token-->')
    // console.log('get token',getToken);
    
    var headers=new HttpHeaders().set('authorization',`${getToken}`)
    
    return this.http.get<any>(`http://localhost:3000/portfolio/token`,{headers});
  }
  forgetPassword(payload:any){
    return this.http.post<any>(`http://localhost:3000/portfolio/frgtpwdEmail`,payload)
  }
}
