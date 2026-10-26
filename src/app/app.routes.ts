import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProfilePage } from './prosit1/profile-page/profile-page';
import { ConferenceDetail } from './prosit2/conference-detail/conference-detail';
import { ConferenceList } from './prosit3/conference-list/conference-list';
import { ConferenceList as CommunicationPage } from './prosit4/conference-list/conference-list';
import { ConferenceList as ApiConferenceList } from './prosit5/conference-list/conference-list';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: Home, title: 'Accueil' },
  { path: 'profil', component: ProfilePage, title: 'Prosit 1 - Profil' },
  { path: 'detail-conference', component: ConferenceDetail, title: 'Prosit 2 - Data-binding' },
  { path: 'conferences', component: ConferenceList, title: 'Prosit 3 - Conférences' },
  { path: 'communication', component: CommunicationPage, title: 'Prosit 4 - Communication' },
  { path: 'api-conferences', component: ApiConferenceList, title: 'Prosit 5 - HttpClient' },
  {
    path: 'api-conferences/ajout',
    loadComponent: () => import('./prosit5/conference-form/conference-form').then((c) => c.ConferenceForm),
    title: 'Prosit 5 - Ajout',
  },
  {
    path: 'api-conferences/:id',
    loadComponent: () => import('./prosit5/conference-detail/conference-detail').then((c) => c.ConferenceDetail),
    title: 'Prosit 5 - Détail',
  },
  {
    path: 'api-conferences/:id/modifier',
    loadComponent: () => import('./prosit5/conference-form/conference-form').then((c) => c.ConferenceForm),
    title: 'Prosit 5 - Modification',
  },
  { path: '**', redirectTo: 'accueil' },
];
