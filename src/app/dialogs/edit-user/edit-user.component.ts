import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserListService } from '../../services/user-list.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../interfaces/user.interface';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  @Input() user: User = {
    firstName: '',
    lastName: '',
    mail: '',
    birthDate: null,
    street: '',
    zipCode: null,
    city: '',
  };

  loading = false;
  birthDate!: Date;


  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    public userService: UserListService
  ) {}

  saveEditedUser() {
    console.log(this.user);
    
  }
}
