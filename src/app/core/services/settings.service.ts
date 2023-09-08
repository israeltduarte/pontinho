import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import data from '../../../api/data.json';
// import { Observable } from 'rxjs';
import { Settings } from '../models/settings';

@Injectable()
export class UserService {
  baseURL: string = 'localhost:8080/settings';

  constructor(private http: HttpClient) {}

  getSettings(): Settings {
    return data.settings;
    // return this.http.get<Settings>(this.baseURL);
  }
}
