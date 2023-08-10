import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('', []),
      lastname: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', []),
    });
  }

  getDataForm() {
    console.log(this.userForm);
  }
}
