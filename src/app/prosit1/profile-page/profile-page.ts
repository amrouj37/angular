import { Component } from '@angular/core';
import { Profile } from '../profile/profile';
import { FriendsList } from '../friends-list/friends-list';
import { Notifications } from '../notifications/notifications';

@Component({
  selector: 'app-profile-page',
  imports: [Profile, FriendsList, Notifications],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {}
