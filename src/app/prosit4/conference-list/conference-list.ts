import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConferenceService } from '../../services/conference.service';
import { Conference } from '../../models/conference';
import { ConferenceDetail } from '../conference-detail/conference-detail';

@Component({
  selector: 'app-p4-conference-list',
  imports: [DatePipe, ConferenceDetail],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  private readonly service = inject(ConferenceService);

  readonly conferences = computed(() => {
    const maintenant = new Date();
    return this.service.conferences().filter((c) => c.date >= maintenant);
  });

  // je garde l'id et pas l'objet sinon le detail est pas a jour apres l'inscription
  readonly selectedId = signal<number | null>(null);

  readonly selected = computed(
    () => this.conferences().find((c) => c.id === this.selectedId()) ?? null,
  );

  readonly message = signal('');

  selectionner(c: Conference): void {
    this.selectedId.set(c.id);
    this.message.set('');
  }

  // evenement envoyé par le composant enfant
  onInscription(c: Conference): void {
    this.service.inscrire(c.id);
    this.message.set(`Inscription enregistrée pour ${c.title}`);
  }

  onFermer(): void {
    this.selectedId.set(null);
    this.message.set('');
  }
}
