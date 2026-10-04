# Prosit 4 : Communication entre composants

## Mots clés
composant parent, composant enfant, input(), output(), @Input, @Output, EventEmitter, $event, service, model()

## Problématique
Comment transmettre la conférence sélectionnée de ConferenceList a ConferenceDetail en gardant une architecture claire et maintenable ?

## Hypothèses
- Chaque composant a ses propres données, sans mécanisme ils partagent rien -> vrai, c'est pour ca que le détail reste vide
- Le parent peut envoyer une donnée a l'enfant avec input() -> vrai
- L'enfant peut envoyer un événement au parent avec output() -> vrai
- Pour des composants qui sont pas parent/enfant on peut utiliser un service -> vrai
- Utiliser @ViewChild pour accéder directement a l'enfant -> pas la meilleure solution, ca crée un couplage fort

## Plan d'action
1. Comprendre pourquoi le détail se met pas a jour
2. Voir les moyens de communication dans Angular
3. Mettre ConferenceDetail dans ConferenceList
4. Parent -> enfant avec input()
5. Enfant -> parent avec output()

## Réalisation

Parent -> enfant :
```ts
// enfant
conference = input<Conference | null>(null);
```
```html
<!-- parent -->
<app-p4-conference-detail [conference]="selected()" />
```

Enfant -> parent :
```ts
// enfant
inscription = output<Conference>();
this.inscription.emit(conf);
```
```html
<!-- parent -->
<app-p4-conference-detail (inscription)="onInscription($event)" />
```

Ancienne syntaxe : `@Input()` et `@Output() x = new EventEmitter()`.

Autres moyens :
- `model()` : two-way binding entre parent et enfant
- service avec des signals : pour partager des données entre composants qui sont pas liés
- `@ViewChild` : accès direct a l'enfant (a éviter si possible)

Fonctionnement dans le projet (`src/app/prosit4`) :
1. clic sur une conférence -> le parent change `selectedId`
2. `selected()` est recalculé -> l'enfant reçoit la nouvelle conférence et s'affiche
3. clic sur s'inscrire dans l'enfant -> il émet `inscription`
4. le parent reçoit l'événement et met a jour les données dans `ConferenceService`

L'enfant modifie jamais les données lui meme, il prévient juste le parent. Comme ca il est réutilisable et on sait toujours d'ou viennent les changements.

## Réponse
Pour des composants imbriqués on utilise input() pour envoyer les données du parent vers l'enfant et output() pour envoyer les événements de l'enfant vers le parent. Si les composants sont pas liés on passe par un service.
