import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService{

  constructor(
    private http: HttpClient,
  ) { }

  get(url) {
    return this.http.get(url)
  }

  post(url, payload){
    return this.http.post(url, payload)
  }

  put(url, payload, _id){
    let URL = url+_id
    return this.http.put(URL, payload)
  }
}
