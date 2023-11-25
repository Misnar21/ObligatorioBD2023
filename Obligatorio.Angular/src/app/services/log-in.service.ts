
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient, private cookies: CookieService) {}

 // poner acaaa
  login(user: any): Observable<any> {
    return this.http.post("........", user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }

  getToken() {
    return this.cookies.get("token");
  }

  isLoggedIn() {
    return this.cookies.check("userID");
  }

  setUserData(user: string) {
    this.cookies.set("userID", user);
  }

  getUserData() {
    return { user: this.cookies.get("userID") };
  }

  logOut() {
    this.cookies.delete("userID");
    this.cookies.delete("token");
  }

  signUp(user: String, pass: String){
    let datos = {
      userID: user,
      password: pass
    }
    return this.http.post("........", datos);
    
  }
}

