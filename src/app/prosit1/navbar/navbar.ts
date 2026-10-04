import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface LienMenu {
  libelle: string;
  chemin: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly liens: LienMenu[] = [
    { libelle: 'Accueil', chemin: '/accueil' },
    { libelle: 'P1 · Profil', chemin: '/profil' },
    { libelle: 'P2 · Data-binding', chemin: '/detail-conference' },
  ];
}
