import { Injectable, signal } from '@angular/core';
import { Conference } from '../models/conference';

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  private readonly _conferences = signal<Conference[]>([
    {
      id: 1,
      title: 'Angular Signals en pratique',
      description: 'Réactivité fine, computed, effects et migration depuis RxJS.',
      date: new Date(2027, 1, 15, 14, 30),
      place: 'Esprit - Bloc E, Amphi 1',
      maxParticipants: 120,
      nbParticipants: 64,
    },
    {
      id: 2,
      title: 'Cloud & DevSecOps',
      description: 'Pipelines CI/CD sécurisés, conteneurs et bonnes pratiques cloud.',
      date: new Date(2027, 2, 3, 9, 0),
      place: 'Tunis - Cité des Sciences',
      maxParticipants: 80,
      nbParticipants: 74,
    },
    {
      id: 3,
      title: 'Architecture logicielle moderne',
      description: 'Microservices, monolithe modulaire et Domain-Driven Design.',
      date: new Date(2027, 3, 20, 10, 0),
      place: 'Esprit - Salle de conférence',
      maxParticipants: 50,
      nbParticipants: 50,
    },
    {
      id: 4,
      title: 'Intelligence artificielle générative',
      description: 'LLM, RAG et intégration de modèles dans les applications web.',
      date: new Date(2027, 4, 11, 15, 0),
      place: 'Sousse - Technopole',
      maxParticipants: 200,
      nbParticipants: 112,
    },
    {
      // celle ci est passée, elle doit pas s'afficher
      id: 5,
      title: 'Introduction à TypeScript',
      description: 'Types, interfaces, génériques.',
      date: new Date(2025, 10, 5, 9, 0),
      place: 'Esprit - Amphi 2',
      maxParticipants: 100,
      nbParticipants: 100,
    },
  ]);

  readonly conferences = this._conferences.asReadonly();

  inscrire(id: number): void {
    this._conferences.update((liste) =>
      liste.map((c) =>
        c.id === id && c.nbParticipants < c.maxParticipants
          ? { ...c, nbParticipants: c.nbParticipants + 1 }
          : c,
      ),
    );
  }
}
