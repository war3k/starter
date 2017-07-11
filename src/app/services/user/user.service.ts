import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CommonService } from './../index';
import { User } from './../../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserService {
  constructor(private common: CommonService) { }

  getAll() {
    if (!localStorage.getItem('users')) {
      return this.common.secureGet('/api/users').map((response: Response) => {
        localStorage.setItem('users', JSON.stringify(response.json()));
        return response.json();
      });
    } else {
      const data = JSON.parse(localStorage.getItem('users'));
      const observableData = new BehaviorSubject(data);
      return observableData;
    }
  }

  getById(_id: string) {
    return this.common.secureGet('/api/users/' + _id).map((response: Response) => response.json());
  }

  create(user: User) {
    localStorage.removeItem('users');
    return this.common.securePost('/api/users/register', user);
  }

  update(user: User) {
    localStorage.removeItem('users');
    return this.common.securePut('/api/users/' + user._id, user);
  }

  delete(_id: string) {
    localStorage.removeItem('users');
    return this.common.secureDelete('/api/users/' + _id);
  }
}
