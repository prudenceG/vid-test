import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/interfaces/user.interface';
import { Key } from 'src/interfaces/key.interface';
import { UserInformationsService } from 'src/app/services/user-informations.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input() users: User[];

  @Input() filteredUsers: User[];

  @Input() keys: Key[];

  @Output() removeUserEvent = new EventEmitter();

  @Output() filteredListEvent = new EventEmitter();

  constructor(
    private userInformationService: UserInformationsService,
  ) {}

  removeUser(user): void {
    const newUsers = this.userInformationService.filterUserListById(user, this.users);

    localStorage.setItem('users', JSON.stringify(newUsers));
    this.removeUserEvent.emit(newUsers);
    this.filteredUsers = this.userInformationService.filterUserListById(user, this.filteredUsers);
    this.filteredListEvent.emit(this.filteredUsers);
  }
}
