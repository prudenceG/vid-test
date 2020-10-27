import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInformationsService } from 'src/app/services/user-informations.service';
import { District } from 'src/interfaces/district.interface';
import { User } from 'src/interfaces/user.interface';
import { Key } from 'src/interfaces/key.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() keys: Key[];
  @Output() newUserEvent = new EventEmitter<User>();

  districts: District[];
  userInformationsForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^\d{10}$/)] ),
    district: new FormControl('', [Validators.required]),
  });

  constructor(
    private userInformations: UserInformationsService,
  ) { }

  ngOnInit(): void {
    this.userInformations.getDistrict()
      .subscribe(results => this.districts = results)
    ;
  }

  onSubmit(): void {
    this.newUserEvent.emit(this.userInformationsForm.value);
  }
}
