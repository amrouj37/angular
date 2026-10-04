import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly prosits = [
    { num: 1, titre: 'Notion de composant', chemin: '/profil', resume: 'Découper une page en composants indépendants.' },
    { num: 2, titre: 'Data-binding & Signals', chemin: '/detail-conference', resume: 'Lier TypeScript et HTML avec les signals.' },
  ];
}
