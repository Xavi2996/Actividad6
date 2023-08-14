import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public page!: number;
  id: string = '';

  arrData!: any;
  arrUsers!: any;
  arrUserFind!: any;
  namaUser!: string;

  //inyección de servicio
  usersService = inject(UsersService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  //Obtener Todos lo usuarios
  obtenerUsuarios() {
    this.arrData = this.usersService.getAll().subscribe((data) => {
      this.arrData = data;
      this.arrUsers = data.results;
      console.log(this.arrData);
      console.log(this.arrUsers);
      this.activeRoute.params.subscribe((params) => {
        this.id = params['id'];
        if (this.id != undefined) {
          this.deleteUser(this.id);
        }
      });
    });
  }

  deleteUser(id: string) {
    this.arrUserFind = this.arrUsers.filter((el: any) => el._id === id);
    this.namaUser = this.arrUserFind[0].first_name;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `Deseas eliminar al usuario ${this.namaUser}`,
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
                ` ${this.namaUser} borrado correctamente.`,
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
            `${this.namaUser} no a sido borrada.`,
            'error'
          );
        }
        this.router.navigate(['/home']);
      });
  }
}
