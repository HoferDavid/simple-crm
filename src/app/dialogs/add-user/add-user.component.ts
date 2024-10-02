import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserListService } from '../../services/user-list.service';
import { User } from '../../../models/user.class';

@Component({
  selector: 'app-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  user: User = new User();
  birthDate!: Date;
  loading = false;


  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    public userService: UserListService
  ) {}
  

  async saveNewUser() {
    if (this.birthDate) {
      this.loading = true;
      this.user.birthDate = this.birthDate.getTime();
      await this.userService.saveUser(this.user);
      this.loading = false;
      this.dialogRef.close();
    } else {
      console.error('Birthdate is undefined');
    }
  }
}
