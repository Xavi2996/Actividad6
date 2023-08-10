import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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

  //inyección de servicio
  usersService = inject(UsersService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.activeRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);

      if (this.id != undefined) {
        this.deleteUser();
      }
    });
  }

  //Obtener Todos lo usuarios
  obtenerUsuarios() {
    this.arrData = this.usersService.getAll().subscribe((data) => {
      this.arrData = data;
      this.arrUsers = data.results;
      console.log(this.arrData);
      console.log(this.arrUsers);
    });
  }

  deleteUser() {
    this.usersService.deleteUser(this.id).subscribe((data) => {
      if (data) {
        console.log(data);

        console.log('hola');
      }
    });
  }
}
