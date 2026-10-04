# Prosit 2 : Data binding et Signals

## Mots clés
data binding, interpolation, property binding, event binding, two-way binding, ngModel, signal, computed, set, update, @if

## Problématique
Comment faire communiquer le code TypeScript et le template HTML pour afficher les données, mettre a jour l'interface et récupérer les actions de l'utilisateur ?

## Hypothèses
- Déclarer les données dans la classe suffit pas, il faut les lier dans le template -> vrai
- Un signal se lit en l'appelant `titre()` -> vrai (si on oublie les parenthèses ca affiche pas la valeur)
- On récupère les clics et saisies avec `( )` -> vrai
- Le two-way binding permet de synchroniser un input avec une donnée -> vrai

## Plan d'action
1. Voir les types de data binding
2. Voir les signals
3. Afficher les infos de la conférence
4. Gérer le bouton d'inscription
5. Modifier le titre en temps réel

## Réalisation

Les 4 types de binding :

| Type | Syntaxe | Sens |
|---|---|---|
| Interpolation | `{{ titre() }}` | TS -> HTML |
| Property binding | `[disabled]="complet()"` | TS -> HTML |
| Event binding | `(click)="sInscrire()"` | HTML -> TS |
| Two-way binding | `[(ngModel)]="titre"` | les 2 sens |

Pour ngModel il faut importer `FormsModule`.

Signals :
```ts
placesDisponibles = signal(5);
this.placesDisponibles();                    // lire
this.placesDisponibles.set(10);              // modifier
this.placesDisponibles.update(n => n - 1);   // modifier a partir de l'ancienne valeur
complet = computed(() => this.placesDisponibles() === 0);
```
Quand un signal change, Angular met a jour seulement les endroits du template qui l'utilisent. `computed` se recalcule tout seul quand les signals qu'il utilise changent.

Pour l'affichage conditionnel on utilise `@if / @else` au lieu de `*ngIf`.

Dans le composant (`src/app/prosit2`) :
- les infos de la conférence sont des signals
- le bouton s'inscrire diminue le nombre de places et se désactive quand c'est complet
- le titre se modifie en temps réel avec `[(ngModel)]` (j'ai aussi fait la version avec `[value]` + `(input)`)

Pourquoi au début rien s'affichait : soit les données étaient pas dans le template, soit le signal était utilisé sans `()`, soit la propriété était private.

## Réponse
Angular utilise le data binding : interpolation et property binding pour afficher les données du TS dans le HTML, event binding pour récupérer les actions de l'utilisateur, et two-way binding pour les 2 sens. Avec les signals l'interface se met a jour automatiquement quand une donnée change.
