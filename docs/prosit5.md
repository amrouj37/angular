# Prosit 5 : HttpClient et web services

## Mots clés
HttpClient, provideHttpClient, withFetch, json-server, REST, GET, POST, PUT, PATCH, DELETE, Observable, subscribe, Signal, toSignal, httpResource, service à état

## Problématique
Comment remplacer la liste statique du service par un vrai backend et faire le CRUD complet (lister, détail, ajouter, modifier, supprimer) depuis Angular ?

## Hypothèses
- Le composant peut appeler le serveur directement -> faux, tout passe par le service, le composant connait pas les URLs
- HttpClient renvoie directement les données -> faux, il renvoie un Observable, il faut s'abonner sinon la requete part pas
- PUT et PATCH c'est pareil -> faux, PUT remplace tout l'objet, PATCH modifie que les champs envoyés
- On peut afficher le résultat d'une requete avec un signal -> vrai (service à état, toSignal ou httpResource)

## Plan d'action
1. Installer json-server et créer `db.json`
2. Déclarer `provideHttpClient(withFetch())` dans `app.config.ts`
3. Créer le service avec les 5 méthodes HTTP
4. Garder l'état dans des signals (liste, chargement, erreur)
5. Consommer le service dans les composants : liste, détail, formulaire ajout / modification

## Réalisation

Backend :
```bash
npm install -D json-server@0.17.4
npm run api   # http://localhost:3000/conferences
```

| Verbe  | URL                | Action          |
|--------|--------------------|-----------------|
| GET    | /conferences       | lister          |
| GET    | /conferences/1     | détail          |
| POST   | /conferences       | ajouter         |
| PUT    | /conferences/1     | remplacer       |
| DELETE | /conferences/1     | supprimer       |

Service (`src/app/services/conference-api.service.ts`) :
```ts
update(conf: ConferenceApi): Observable<ConferenceApi> {
  return this.http.put<ConferenceApi>(`${this.url}/${conf.id}`, conf);
}

delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`);
}
```

Apres une écriture réussie on met a jour le signal local au lieu de tout recharger :
```ts
remove(id: number): void {
  this.delete(id).subscribe(() =>
    this._conferences.update((l) => l.filter((c) => c.id !== id)));
}
```

Composants (`src/app/prosit5`) :
- `conference-list` : appelle `load()` dans `ngOnInit`, affiche les 3 états (chargement / erreur / données), boutons détail, modifier, supprimer
- `conference-detail` : `httpResource()` avec l'`id` de la route, la requete se relance si l'id change
- `conference-form` : formulaire réactif utilisé pour l'ajout (POST) et la modification (GET pour pré-remplir puis PUT)

Pour tester : lancer `npm run api` et `ng serve` dans deux terminaux, puis vérifier les requetes dans l'onglet Réseau du navigateur.

## Réponse
On injecte HttpClient dans un service qui contient toutes les requetes (get, post, put, delete). Les composants appellent seulement le service. Comme HttpClient renvoie des Observables, on convertit en signal pour l'affichage (service à état ou httpResource) et apres chaque écriture on met a jour le signal local.
