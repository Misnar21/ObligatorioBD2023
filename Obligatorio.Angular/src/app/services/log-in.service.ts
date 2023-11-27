
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient, private cookies: CookieService) {}

  url: string = "http://localhost:3000/"

  login(user: any): Observable<any> {
    return this.http.post(this.url + "login/", user);
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

  signUp(datos: any):  Observable<any>{
    return this.http.post(this.url + "usuario/addUsuario", datos);
  }
}

