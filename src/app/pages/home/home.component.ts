import { Component, inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  arrData!: any;
  arrUsers!: any;

  //inyección de servicio
  usersService = inject(UsersService);

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
    });
  }
}
