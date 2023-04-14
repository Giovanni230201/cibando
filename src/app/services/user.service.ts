import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  datiUtente = new ReplaySubject;
  apiBaseUrl = 'api/users';

  userRole = new ReplaySubject;


  constructor(private http: HttpClient) { }

  insertUser(user): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/signup`, user);
  }

  getUser(email: string): Observable<any>{
    const emailUtente = {'email' : email}
    return this.http.post<any>(`${this.apiBaseUrl}/user`, emailUtente)
  }

}
