import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
        ),
      ]),
      image: new FormControl('', [Validators.required]),
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
            name: new FormControl(data.first_name, [
              Validators.required,
              Validators.minLength(3),
            ]),
            lastname: new FormControl(data.last_name, [Validators.required]),
            email: new FormControl(data.email, [
              Validators.required,
              Validators.pattern(
                /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
              ),
            ]),
            image: new FormControl(data.image, [Validators.required]),
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
        Swal.fire({
          title: `Usuario ${data.first_name} ha sido actualizado`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      });
    } else {
      this.usersService.createUser(this.userForm.value).subscribe((data) => {
        console.log(data);
        Swal.fire({
          title: `Usuario ${this.userForm.value.name} ha sido creado`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      });
    }
  }

  errorControl(
    formControlName: string,
    validator: string
  ): boolean | undefined {
    //para no escribir tanto código en el html para labels de error de cada input
    return (
      this.userForm.get(formControlName)?.hasError(validator) &&
      this.userForm.get(formControlName)?.touched
    );
  }
}
