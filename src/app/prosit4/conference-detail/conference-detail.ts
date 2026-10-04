import { Component, computed, input, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-p4-conference-detail',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
})
export class ConferenceDetail {
  // parent -> enfant
  readonly conference = input<Conference | null>(null);

  // enfant -> parent
  readonly inscription = output<Conference>();

  readonly fermer = output<void>();

  readonly placesRestantes = computed(() => {
    const c = this.conference();
    return c ? c.maxParticipants - c.nbParticipants : 0;
  });

  sInscrire(): void {
    const c = this.conference();
    if (c && this.placesRestantes() > 0) {
      this.inscription.emit(c);
    }
  }
}
