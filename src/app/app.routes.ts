import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProfilePage } from './prosit1/profile-page/profile-page';
import { ConferenceDetail } from './prosit2/conference-detail/conference-detail';
import { ConferenceList } from './prosit3/conference-list/conference-list';
import { ConferenceList as CommunicationPage } from './prosit4/conference-list/conference-list';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: Home, title: 'Accueil' },
  { path: 'profil', component: ProfilePage, title: 'Prosit 1 - Profil' },
  { path: 'detail-conference', component: ConferenceDetail, title: 'Prosit 2 - Data-binding' },
  { path: 'conferences', component: ConferenceList, title: 'Prosit 3 - Conférences' },
  { path: 'communication', component: CommunicationPage, title: 'Prosit 4 - Communication' },
  { path: '**', redirectTo: 'accueil' },
];
