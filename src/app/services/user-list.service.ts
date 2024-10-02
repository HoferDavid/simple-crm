import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user.interface';
// import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  user: User[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() {}

  async saveUser(user: User) {
    try {
      const userRef = collection(this.firestore, 'users');
      const docRef = await addDoc(userRef, user);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  getCleanJson(user: User):{} {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }
}
