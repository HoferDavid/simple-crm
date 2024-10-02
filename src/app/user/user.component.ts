import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from '../dialogs/add-user/add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore } from '@angular/fire/firestore';
import { query } from 'express';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, AddUserComponent, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  user: User = new User();
  allUsers = [];
  
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddUserComponent);
  }


  ngOnInit(): void {
    // const userRef = collection(this.firestore, 'users');
    // subUserList() {
    //   const q = query(userRef)
    // }
  }
}
