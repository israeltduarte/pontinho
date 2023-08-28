import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import data from '../../../api/data.json';
// import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  baseURL: string = 'localhost:8080/';

  constructor(private http: HttpClient) {}

  getUser(userId: string): User {
    return data.user;
    // return this.http.get<Company>(this.baseURL + 'user/' + userId + '/company');
  }
}
