import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  client(): HttpClient {
    return this.http;
  }

  async getAllBooks() {
    var data: any;
    return this.http.get("http://localhost:5041/api/book/all");
  }
}
