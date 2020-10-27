import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/interfaces/user.interface';
import { UserInformationsService } from './../../services/user-informations.service';
import { Key } from 'src/interfaces/key.interface';

@Component({
  selector: 'app-search-value',
  templateUrl: './search-value.component.html',
  styleUrls: ['./search-value.component.scss']
})
export class SearchValueComponent implements OnInit {
  @Input() users: User[];
  @Input() filteredUsers: User[];
  @Input() keys: Key[];
  @Output() filteredListEvent = new EventEmitter();

  searchForm = new FormGroup({
    filterType: new FormControl('lastname', [Validators.required]),
    searchValue: new FormControl('', [Validators.required]),
  });

  constructor(
    private userInformations: UserInformationsService,
  ) { }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(async _ => {
      const { filterType, searchValue } = this.searchForm.value;

      if (searchValue) {
        const filteredList = await this.userInformations.filterByValue(filterType, searchValue, this.users);

        this.filteredListEvent.emit(filteredList);

        return;
      }

      this.filteredListEvent.emit(this.users);
    });
  }
}
