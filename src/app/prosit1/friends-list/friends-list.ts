import { Component } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.html',
  styleUrl: './friends-list.css',
})
export class FriendsList {
  readonly amis = [
    { id: 1, nom: 'Sarra', enLigne: true },
    { id: 2, nom: 'Yassine', enLigne: false },
    { id: 3, nom: 'Ines', enLigne: true },
    { id: 4, nom: 'Mehdi', enLigne: false },
  ];
}
