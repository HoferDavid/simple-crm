import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  private userSource = new BehaviorSubject<User[]>([]);
  users$ = this.userSource.asObservable();

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.subUserList();
    console.log(this.users$);
  }

  async saveUser(user: User) {
    try {
      const userRef = collection(this.firestore, 'users');
      const docRef = await addDoc(userRef, user);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  subUserList() {
    const q = query(collection(this.firestore, 'users'));
    onSnapshot(q, (snapshot) => {
      const users: User[] = [];
      snapshot.forEach((doc) => {
        const userData = doc.data() as User;
        const userWithId = { ...userData, id: doc.id };
        users.push(userWithId);
      });
      console.log('Updated users from Firestore: ', users); // Check if this logs updated users
      this.userSource.next(users);
    });
  }

  async getUserById(userId: string): Promise<User | undefined> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as User;
      } else {
        console.log('no such document');
        return undefined;
      }
    } catch (error) {
      console.error('Erros getting user: ', error);
      return undefined;
    }
  }

  async updateUser(userId: string, updatedUser: Partial<User>): Promise<void> {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await setDoc(userRef, updatedUser, { merge: true });
      console.log('User updated with ID: ', userId);
      // No need to update local state here; Firestore will handle it
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  }
}
