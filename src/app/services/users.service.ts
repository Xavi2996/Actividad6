import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpclient = inject(HttpClient);
  private url: string = 'https://peticiones.online/api/users/';
  constructor() {}

  getAll(): Observable<any> {
    return this.httpclient.get<any>(this.url);
  }

  getUserById(id: string): Observable<User> {
    return this.httpclient.get<User>(`${this.url}${id}`);
  }

  deleteUser(id: string): Observable<User> {
    return this.httpclient.delete<User>(`${this.url}${id}`);
  }
}
