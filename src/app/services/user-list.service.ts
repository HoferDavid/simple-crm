import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async saveUser(user: User) {
    try {
      const userRef = collection(this.firestore, 'users');
      const docRef = await addDoc(userRef, user.toJSON());
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
}
