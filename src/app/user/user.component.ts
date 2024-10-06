import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from '../dialogs/add-user/add-user.component';
import { MatCardModule } from '@angular/material/card';
import { UserListService } from '../services/user-list.service';
import { User } from '../interfaces/user.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    AddUserComponent,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(public userListService: UserListService) {}

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddUserComponent);
  }

  ngOnInit(): void {
    this.userListService.users$.subscribe((users) => {
      console.log('Updated users in component: ', users); // Debugging
      this.users = users; // This should trigger a view update
    });
  }
}
