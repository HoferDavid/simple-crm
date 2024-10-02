import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  constructor(public dialogRef: MatDialogRef<AddUserComponent>) {}

  firestore: Firestore = inject(Firestore);

  user: User = new User();
  birthDate!: Date;
  loading = false;

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();

    try {
      const userRef = collection(this.firestore, 'users');
      const docRef = await addDoc(userRef, this.user.toJSON());
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    this.loading = false;
    this.dialogRef.close();
  }
}
