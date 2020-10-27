import { Component, OnInit } from '@angular/core';
import { UserInformationsService } from './services/user-informations.service';
import { User } from 'src/interfaces/user.interface';
import { Key } from 'src/interfaces/key.interface';
import { SearchValue } from 'src/interfaces/searchValue.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[];
  keys: Key[];
  searchFormValues: SearchValue = {
    filterType: 'lastname',
    searchValue: '',
  };
  errorMessage: string;

  constructor(
    private userInformationService: UserInformationsService,
  ) {}

  ngOnInit(): void {
    const users = this.userInformationService.getUsers();
    const sortedUsers = this.userInformationService.sortByProperty('lastname', users);

    if (!users) {
      localStorage.setItem('users', JSON.stringify([]));
    }

    this.users = sortedUsers;
    this.filteredUsers = sortedUsers;
    this.keys = this.userInformationService.getKeys();
  }

  addUser(user: User): void {
    const newUser = this.userInformationService.addIdToUser(user);
    const [result, message] = this.userInformationService.saveUser(newUser, this.users);
    const newUsers = result ? result : this.users;

    this.users = newUsers;

    if (result) {
      const { filterType, searchValue } = this.searchFormValues;
      let newFilteredUsers = this.userInformationService.addUser(newUser, this.filteredUsers);
      newFilteredUsers = this.userInformationService.filterByValue(filterType, searchValue, this.users);

      this.filteredUsers = newFilteredUsers;
      this.errorMessage = '';

      return;
    }

    this.errorMessage = message;
  }

  deleteUsers(newUsersList: User[]): void {
    this.users = newUsersList;
  }

  updateUsers(newUsersList: User[]): void {
    this.filteredUsers = newUsersList;
  }

  setSearhFormValues(values: SearchValue): void {
    this.searchFormValues = values;
  }
}
