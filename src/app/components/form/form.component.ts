import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  userForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  arrUser!: User | any;

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('', []),
      lastname: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      let id: string = params['id'];
      console.log(id);
      if (id != undefined) {
        //llenar formulario de actualizar
        this.arrUser = this.usersService.getUserById(id).subscribe((data) => {
          this.userForm = new FormGroup({
            id: new FormControl(data._id, []),
            name: new FormControl(data.first_name, []),
            lastname: new FormControl(data.last_name, []),
            email: new FormControl(data.email, []),
            image: new FormControl(data.image, []),
          });
        });
      }
    });
  }

  getDataForm() {
    // console.log(this.userForm.value);
    if (this.userForm.value.id) {
      this.usersService.update(this.userForm.value).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.usersService.createUser(this.userForm.value).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
