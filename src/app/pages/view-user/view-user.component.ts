import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

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

  ngOnInit(): void {
    //Capturar Ruta Activa
    this.activateRoute.params.subscribe((params) => {
      let id = params['id'];
      this.oneUser = this.usersService.getUserById(id).subscribe((data) => {
        this.oneUser = data;
      });
    });
  }
}
