# Prosit 1 : Notion de composant

## Mots clés
composant, @Component, selector, template, standalone, imports, réutilisation, maintenance

## Problématique
Comment organiser une page qui contient plusieurs sections indépendantes (header, menu, profil, amis, notifications, footer) pour qu'elle reste facile a maintenir et a réutiliser ?

## Hypothèses
- Tout mettre dans un seul composant rend le code difficile a maintenir -> vrai
- Angular permet de découper la page en plusieurs composants -> vrai
- Un composant peut en afficher un autre avec son selector -> vrai
- Le header, le menu et le footer peuvent etre mis une seule fois dans le composant racine -> vrai

## Plan d'action
1. Comprendre c'est quoi un composant
2. Identifier les sections de la page
3. Créer un composant par section avec `ng g c`
4. Assembler les composants

## Réalisation
Un composant = une classe TS avec le décorateur `@Component` + un template HTML + un fichier CSS (le CSS est encapsulé, il touche pas les autres composants).

```ts
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
```

Depuis Angular 17 les composants sont standalone par défaut, donc pas besoin de NgModule, on met directement ce qu'on utilise dans `imports`.

Découpage :
```
App
  Header
  Navbar
  router-outlet
    ProfilePage (/profil)
      Profile
      FriendsList
      Notifications
  Footer
```

Header, Navbar et Footer sont dans `App` parce qu'ils sont communs a toutes les pages. `ProfilePage` sert juste a assembler les 3 autres composants.

Code : `src/app/prosit1`

## Avantages
- chaque composant a un seul role donc plus facile a corriger
- plusieurs devs peuvent travailler en meme temps sans conflits
- on peut réutiliser un composant dans d'autres pages (ex: la navbar)
- plus facile a tester

## Réponse
On découpe la page en plusieurs composants standalone, un par section, et on les assemble avec leurs selectors dans un composant parent. Les parties communes sont mises dans le composant racine.
