import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = "http://localhost:8080/user";
  constructor(private http: HttpClient) { }

  
/**
 * It sends a post request to the server with the email and password of the user.
 * @param {string} email - the email of the user
 * @param {string} psw - the password of the user
 * @returns An Observable of type any.
 */
  userLogin(email:string, psw:string): Observable<any>{
    const params = new HttpParams()
                .set('email', email)
                .set('psw', psw);
    return this.http.post(`http://localhost:8080/user/login`, params);
  }

/**
 * The register function takes in a user's registration details and sends them to the server
 * @param {any} regDetails - any = {
 * @returns An Observable of type any.
 */
  register(regDetails:any): Observable<any>{
    return this.http.post(`http://localhost:8080/user/adduser`, regDetails);
  }

/**
 * This function is used to verify the user's email address
 * @param {any} regDetails - any
 * @returns The observable is returning a JSON object.
 */
  verification(regDetails:any): Observable<any>{
    return this.http.post(`http://localhost:8080/user/verifyuser`, regDetails);
  }

/**
 * It sends a request to the server to change the password of the user.
 * @param {string} email - The email address of the user who forgot their password.
 * @param {string} psw - the new password
 * @returns An Observable of type any.
 */
  forgotPassword(email:string, psw:string): Observable<any>{
    const params = new HttpParams()
                .set('token', email)
                .set('psw', psw);
    return this.http.post(`http://localhost:8080/user/forgotpsw`, params);
  }
}
