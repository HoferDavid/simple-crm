import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot, query } from '@angular/fire/firestore';
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
      this.userSource.next(users);
    });
  }
}
