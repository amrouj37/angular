import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProfilePage } from './prosit1/profile-page/profile-page';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: Home, title: 'Accueil' },
  { path: 'profil', component: ProfilePage, title: 'Prosit 1 - Profil' },
  { path: '**', redirectTo: 'accueil' },
];
