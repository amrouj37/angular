import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { ConferenceService } from '../../services/conference.service';
import { Conference } from '../../models/conference';
import { PlacesRestantesPipe } from '../pipes/places-restantes-pipe';
import { Surbrillance } from '../directives/surbrillance';

export type Disponibilite = 'disponible' | 'presque-complet' | 'complet';

@Component({
  selector: 'app-conference-list',
  imports: [DatePipe, UpperCasePipe, NgClass, NgStyle, PlacesRestantesPipe, Surbrillance],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  private readonly service = inject(ConferenceService);

  readonly simulerListeVide = signal(false);

  // on garde que les conferences pas encore passées
  readonly conferencesAVenir = computed(() => {
    if (this.simulerListeVide()) return [];
    const maintenant = new Date();
    return this.service
      .conferences()
      .filter((c) => c.date >= maintenant)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  });

  placesRestantes(c: Conference): number {
    return c.maxParticipants - c.nbParticipants;
  }

  // vert si >= 10 places, orange si < 10, rouge si complet
  disponibilite(c: Conference): Disponibilite {
    const restantes = this.placesRestantes(c);
    if (restantes <= 0) return 'complet';
    if (restantes < 10) return 'presque-complet';
    return 'disponible';
  }

  tauxRemplissage(c: Conference): number {
    return Math.round((c.nbParticipants / c.maxParticipants) * 100);
  }

  sInscrire(c: Conference): void {
    this.service.inscrire(c.id);
  }
}
