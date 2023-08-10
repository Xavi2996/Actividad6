import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  router = inject(Router);

  @Input() theUser!: User | any;
}
