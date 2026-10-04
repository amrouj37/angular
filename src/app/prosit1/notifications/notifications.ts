import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  readonly notifications = [
    { id: 1, message: 'Votre inscription à Angular Signals en pratique est confirmée' },
    { id: 2, message: 'Nouvelle conférence : Cloud & DevSecOps' },
    { id: 3, message: "Ines vous a envoyé une demande d'ami" },
  ];
}
