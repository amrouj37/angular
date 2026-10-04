import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  readonly utilisateur = {
    prenom: 'Foulen',
    nom: 'Ben Foulen',
    email: 'foulen.benfoulen@esprit.tn',
    role: 'Participant',
    ville: 'Tunis',
  };
}
