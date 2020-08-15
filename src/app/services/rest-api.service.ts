import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const appConfig = require('../../appConfig.json');

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private baseURL: URL;
  private auth_token: string;

  constructor(private httpClient: HttpClient) {

    this.baseURL = new URL(appConfig.apiURL);
    this.auth_token = appConfig.auth_token;

  }

  async makeRequestWithoutAccessToken(method, body, route) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let url = this.baseURL.toString() + route;

    let promise: any;

    switch (method) {
      case 'GET':
        promise = await this.httpClient.get(url, httpOptions).toPromise()
          .catch(err => {
            throw err;
          });
        break;
      case 'POST':
        promise = await this.httpClient.post(url, body, httpOptions).toPromise()
          .catch(err => {
            throw err;
          });
        break;
      default:
        return false;
    }

    let response = await Promise.all([promise]);

    return response;

  }

  async makeRequest(method, body, route) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth_token
      })
    }

    let url = this.baseURL.toString() + route;

    let promise: any;

    switch (method) {
      case 'GET':
        promise = await this.httpClient.get(url, httpOptions).toPromise()
          .catch(err => {
            throw err;
          });
        break;
      case 'POST':
        promise = await this.httpClient.post(url, body, httpOptions).toPromise()
          .catch(err => {
            throw err;
          });
        break;
      case 'PUT':
        promise = await this.httpClient.put(url, body, httpOptions).toPromise()
          .catch(err => {
            throw err;
          });
        break;
      case 'DELETE':
        promise = await this.httpClient.delete(url, httpOptions).toPromise()
          .catch(err => {
            throw err;
          });
        break;
      default:
        return false;
    }

    let response = await Promise.all([promise]);

    return response;

  }

}
