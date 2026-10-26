import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ConferenceApi } from '../models/conference-api';

@Injectable({ providedIn: 'root' })
export class ConferenceApiService {
  private readonly http = inject(HttpClient);
  readonly url = 'http://localhost:3000/conferences';

  // etat du service (signals)
  private readonly _conferences = signal<ConferenceApi[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly conferences = this._conferences.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly count = computed(() => this._conferences().length);

  // ---- requetes HTTP (Observables) ----
  getAll(): Observable<ConferenceApi[]> {
    return this.http.get<ConferenceApi[]>(this.url);
  }

  getById(id: number): Observable<ConferenceApi> {
    return this.http.get<ConferenceApi>(`${this.url}/${id}`);
  }

  add(conf: Omit<ConferenceApi, 'id'>): Observable<ConferenceApi> {
    return this.http.post<ConferenceApi>(this.url, conf);
  }

  // PUT : remplace tout l'objet
  update(conf: ConferenceApi): Observable<ConferenceApi> {
    return this.http.put<ConferenceApi>(`${this.url}/${conf.id}`, conf);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // ---- méthodes appelées par les composants : requete + mise a jour du signal local ----
  load(): void {
    this._loading.set(true);
    this._error.set(null);
    this.getAll().subscribe({
      next: (data) => {
        this._conferences.set(data);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Chargement impossible : json-server est lancé ? (npm run api)');
        this._loading.set(false);
      },
    });
  }

  create(conf: Omit<ConferenceApi, 'id'>, onSuccess?: () => void): void {
    this.add(conf).subscribe((created) => {
      this._conferences.update((l) => [...l, created]);
      onSuccess?.();
    });
  }

  edit(conf: ConferenceApi, onSuccess?: () => void): void {
    this.update(conf).subscribe((updated) => {
      this._conferences.update((l) => l.map((c) => (c.id === updated.id ? updated : c)));
      onSuccess?.();
    });
  }

  remove(id: number): void {
    this.delete(id).subscribe(() => this._conferences.update((l) => l.filter((c) => c.id !== id)));
  }
}
