import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server = environment.serverUrl
  constructor( private http: HttpClient) { }

  signup(user: User){
    return this.http.post(`http://localhost:3000/api/auth/user-signup`, user)
  }
}
