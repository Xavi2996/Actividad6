import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent {
  //Inyectar Servicio
  activateRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  router = inject(Router);
  oneUser!: User | any;
  id: string = '';

  ngOnInit(): void {
    //Capturar Ruta Activa
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.oneUser = this.usersService
        .getUserById(this.id)
        .subscribe((data) => {
          this.oneUser = data;
        });
    });
  }

  deleteUser() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `Deseas eliminar al usuario ${this.oneUser.first_name}`,
        text: 'Para confirmar presione en aceptar',
        showCancelButton: true,
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usersService.deleteUser(this.id).subscribe((data) => {
            if (data) {
              swalWithBootstrapButtons.fire(
                'Usuario Eliminado!',
                ` ${this.oneUser.first_name} borrado correctamente.`,
                'success'
              );
            }
            this.router.navigate(['/home']);
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Acción cancelada',
            `${this.oneUser.first_name} no a sido borrada.`,
            'error'
          );
        }
        this.router.navigate(['/home']);
      });
  }
}
