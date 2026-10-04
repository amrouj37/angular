import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conference-detail',
  imports: [DatePipe, FormsModule],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
})
export class ConferenceDetail {
  readonly titre = signal('Angular Signals en pratique');
  readonly intervenant = signal('Dr. Sami Ben Ali');
  readonly date = signal(new Date(2027, 1, 15, 14, 30));
  readonly placesDisponibles = signal(5);
  readonly inscrit = signal(false);
  readonly imageUrl = signal('conference.svg');

  readonly complet = computed(() => this.placesDisponibles() === 0);
  readonly libelleBouton = computed(() =>
    this.inscrit() ? 'Déjà inscrit' : this.complet() ? 'Complet' : "S'inscrire",
  );

  sInscrire(): void {
    if (this.complet() || this.inscrit()) return;
    this.placesDisponibles.update((n) => n - 1);
    this.inscrit.set(true);
  }

  annulerInscription(): void {
    if (!this.inscrit()) return;
    this.placesDisponibles.update((n) => n + 1);
    this.inscrit.set(false);
  }

  // version sans ngModel
  onTitreSaisi(event: Event): void {
    this.titre.set((event.target as HTMLInputElement).value);
  }
}
