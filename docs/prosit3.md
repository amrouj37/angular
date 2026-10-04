# Prosit 3 : Directives, contrôle de flux et pipes

## Mots clés
directive, directive d'attribut, directive structurelle, ngClass, ngStyle, @if, @for, track, @empty, @switch, pipe, uppercase, date, pipe personnalisé

## Problématique
Comment afficher ou masquer des éléments selon une condition, parcourir une liste et changer l'affichage des données sans modifier leur valeur ?

## Hypothèses
- On peut afficher un élément selon une condition avec @if -> vrai
- On parcourt une liste avec @for et @empty gère le cas liste vide -> vrai
- Les pipes changent l'affichage sans changer la donnée -> vrai
- ngClass permet de changer la couleur du bouton -> vrai
- Filtrer les conférences passées avec un pipe dans le template -> faux, c'est mieux de le faire dans la classe avec computed

## Plan d'action
1. Voir les directives et le contrôle de flux natif
2. Voir les pipes
3. Créer le modèle Conference
4. Filtrer les conférences passées
5. Afficher la liste avec @for / @empty
6. Formater le titre et la date
7. Couleur du bouton selon les places

## Réalisation

Directives :
- directive d'attribut : change l'apparence d'un élément (`ngClass`, `ngStyle`)
- directive structurelle : ajoute/supprime des éléments (`*ngIf`, `*ngFor`), remplacées maintenant par `@if`, `@for`, `@switch`

```html
@for (conf of conferencesAVenir(); track conf.id) {
  ...
} @empty {
  <p>Aucune conférence à venir</p>
}
```
`track` est obligatoire, ca permet a Angular de savoir quel élément a changé.

Pipes utilisés :
- `{{ conf.title | uppercase }}`
- `{{ conf.date | date: 'EEEE dd MMMM yyyy à HH:mm' }}` (avec la locale fr dans app.config.ts)

Couleur du bouton (`[ngClass]`) :
- vert : 10 places ou plus
- orange : moins de 10 places
- rouge : complet

En plus j'ai fait :
- un pipe `placesRestantes` qui affiche "X places restantes"
- une directive `appSurbrillance` qui change le fond de la carte au survol
- `@switch` pour le badge et `ngStyle` pour la barre de remplissage

Code : `src/app/prosit3`

## Réponse
Le contrôle de flux natif (@if, @for, @switch) choisit quels éléments sont affichés, les directives d'attribut (ngClass, ngStyle) changent leur apparence, et les pipes formatent l'affichage des données sans modifier leur valeur.
