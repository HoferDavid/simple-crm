import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params } from '@angular/router';
import { UserListService } from '../../services/user-list.service';
import { User } from '../../interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../../dialogs/edit-user/edit-user.component';
import { EditAddressComponent } from '../../dialogs/edit-address/edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User | undefined;

  readonly dialog = inject(MatDialog);

  constructor(
    private activatedRoute: ActivatedRoute,
    public userListService: UserListService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      console.log('userid:', this.userId);

      this.loadUser();
    });
  }

  async loadUser() {
    this.user = await this.userListService.getUserById(this.userId);
    if (this.user) {
      console.log('Loaded user: ', this.user);
    }
  }

  editAddressDetails() {
    if (this.user) {
    const dialog = this.dialog.open(EditAddressComponent);
    dialog.componentInstance.user = this.user;
    } else {
      console.log('edit Address Details error');
      
    }
  }

  editUserDetails() {
    if (this.user) {
      const dialog = this.dialog.open(EditUserComponent);
      dialog.componentInstance.user = this.user;
    } else {
      console.log('edit Address Details error');
    }
  }
}
