import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  secureGet(url){
     return this.http.get(url, this.jwt());
  }
  securePost(url, data){
    return this.http.post(url, data, this.jwt());
  }
  securePut(url, data){
    return this.http.put(url, data, this.jwt());
  }
  secureDelete(url){
    return this.http.delete(url, this.jwt());
  }
  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
      }
  }
}
