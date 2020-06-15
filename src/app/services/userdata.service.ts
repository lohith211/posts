import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get(this.API_URL);
  }

  createUser(postdata) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    };

    return this.http.post(this.API_URL, postdata, httpOptions);
  }

  deleteUser(postdata) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postdata.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.delete(url, httpOptions);
  }

  editUser(postdata) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postdata.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    };

    return this.http.put(url, postdata, httpOptions);
  }
}
