import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from './../../interfaces/district.interface';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { keys } from './../../utils/formKeys';
import { Key } from './../../interfaces/key.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInformationsService {
  constructor(
    private http: HttpClient,
  ) {}

  getDistrict(): Observable<District[]> {
    return this.http.get<District[]>('https://geo.api.gouv.fr/regions?fields=nom');
  }

  getKeys(): Key[] {
    return keys;
  }

  addUser(userToSave: User, users: User[]): User[] {
    const newUser = {
      ...userToSave,
      id: uuidv4(),
    };

    let newUsers = [...users, newUser];
    newUsers = this.sortByProperty('lastname', newUsers);

    return newUsers;
  }

  saveUser(userToSave: User, users: User[]): User[] {
    const phoneExists = users.find(user => user.phone && user.phone === userToSave.phone);
    const namesakeExists = users.filter(user => user.firstname === userToSave.firstname && user.lastname === userToSave.lastname);

    if (!phoneExists && namesakeExists.length === 0) {
      const newUsers = this.addUser(userToSave, users);

      localStorage.setItem('users', JSON.stringify(newUsers));

      return newUsers;
    }
  }

  getUsers(): User[] {
    const users = JSON.parse(localStorage.getItem('users'));

    return users ? users : [];
  }

  filterUserListById(userToDelete: User, users: User[]): User[] {
    const newUsers = users.filter(user => user.id !== userToDelete.id);

    return newUsers;
  }

  filterByValue(type: string, value: string, users: User[]): User[] {
    const regex = RegExp(`${value}`, 'gi');
    const filteredUsers = users.filter(user => user[type].match(regex));

    return filteredUsers;
  }

  sortByProperty(property: string, users: User[]): User[] {
    return users.sort((a, b) => {
      const valueA = a[property].toLowerCase();
      const valueB = b[property].toLowerCase();

      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }

      return 0;
    });
  }
}
