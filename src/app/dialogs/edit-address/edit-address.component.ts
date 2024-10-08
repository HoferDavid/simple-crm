import { Component, Input } from '@angular/core';
import { UserListService } from '../../services/user-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.scss',
})
export class EditAddressComponent {
  @Input() user: User = {
    firstName: '',
    lastName: '',
    mail: '',
    birthDate: null,
    street: '',
    zipCode: null,
    city: '',
  };

  birthDate!: Date;
  loading = false;
  userId = '';

  constructor(
    public dialogRef: MatDialogRef<EditAddressComponent>,
    public userService: UserListService
  ) {}

  saveEditedAddress() {
    this.loading = true;
    this.userService
      .updateUser(this.userId, this.user)
      .then(() => {
        console.log('Address updated:', this.user);
        this.dialogRef.close(); // Close dialog only after successful update
      })
      .catch((error) => {
        console.error('Error updating address: ', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
