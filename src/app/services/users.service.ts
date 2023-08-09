import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
