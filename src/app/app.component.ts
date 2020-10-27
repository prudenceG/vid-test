import { Component, OnInit } from '@angular/core';
import { UserInformationsService } from './services/user-informations.service';
import { User } from 'src/interfaces/user.interface';
import { Key } from 'src/interfaces/key.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[];
  keys: Key[];

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
    const result = this.userInformationService.saveUser(user, this.users);
    const newUsers = result ? result : this.users;

    this.users = newUsers;
    this.filteredUsers = result
      ? this.userInformationService.addUser(user, this.filteredUsers)
      : this.filteredUsers
    ;
  }

  deleteUsers(newUsersList: User[]): void {
    this.users = newUsersList;
  }

  updateUsers(newUsersList: User[]): void {
    this.filteredUsers = newUsersList;
  }
}
