# MonteSuivi

MonteSuivi est une application permettant le suivi des ateliers (Montessori) pratiqués par des enfants de maternelle. Elle est développée bénévolement à la demande de la maîtresse de ma fille. L'objectif est de lui faire gagner du temps, d'éviter de jongler entre différents classeurs et les oublis éventuels.
La plupart de son développement peut être suivi en live sur [Twitch](https://www.twitch.tv/lolcat_host) ou [visionné en VOD](https://www.twitch.tv/collections/Nxcax_8Ijxdkrw?filter=collections).

## Les fonctions de base

Il y a 2 cas d'utilisation principaux ayant pour but de choisir un atelier :

1. On part d'un enfant, on veut choisir un atelier en priorisant ceux 1. pré-sélectionnés, 2. déjà présentés 3. à présenter - par ordre de diffuclté croissante
2. La même chose mais en partant d'un atelier disponible, on veut choisir à quel enfant l'attribuer. On suivra la même logique de priorité.

En terme de suivi, on se calque sur la version papier des classeurs utilisés jusqu'alors:

![Photo de la version papier](./resources/img/paper-example.png)

La nomenclature A > B > C représente l'indice de facilité (A avec facilité, B avec difficulté, C échec), alors que 1/2 représente le taux de complétion (1 total, 2 partiel) de l'atelier.

## Les fonctions de gestion

En dehors du choix et suivi des ateliers, on souhaite proposer des fonctions facilitant la préparation des semaines et les rapports périodiques :

- Vue tabulaire Enfant / Atelier permettant de pré-selectionner des ateliers (comme déjà fait sur une autre feuille)
- Gestion des enfants/ateliers (classique ajouter, modification, suppression)
- Vue imprimable de l'index des ateliers - pour la cahier à destination des parents
- Vue imprimable de la progression d'un enfant depuis une date arbitraire (l'objectif est de fournir aux parents "sur la dernière période, j'ai validé tels ateliers, j'ai commencé tels ateliers, etc...")

## Contraintes & Design technique

La priorité absolue de l'application est la sécurité des données qu'elle enregistre et d'en prévenir toute fuite sur internet. La meilleure façon d'y répondre est toute simplement de ne jamais les faire transiter ni les stocker sur le net. Toutes
les données sont dont stockées "en local" sur l'appareil.

La seconde contrainte est qu'elle doit fonctionner sans accès à internet - l'école n'ayant pas un réseau à disposition.

La troisième contrainte forte est de garantir la sauvegarde des données en cas de pépin. Il sera donc important de proposer
à minima une fonction d'import/export des données, et idéallement une fonction de synchronisation avec un autre appareil.

Les dernières contraintes sont celles de l'universalité, de la gratuité, de la facilité d'accès et de maintenance. Exit donc les AppStores et Playstore.

Les contraintes offline et d'hébergement ont largement favorisé le choix de développer une
application web [PWA](https://web.dev/explore/progressive-web-apps). Il suffit d'une seule connection sur le web pour
installer l'app. La sauvegarde des données, photos incluses, se fait uniquement dans le [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) et le [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
Pas de serveur en dehors de l'hébergement statique de l'application.

L'application permet l'import/export de l'ensemble des données via le téléchargement d'un fichier .zip généré en local.

À terme, je souhaite supporter la synchronisation des données entre appareil à proximité via Blutooth / NFC.

## Implémentation

Quelques détails sur la pile technique :

- Hosting -> Github pages
- UI -> [ReactJS](https://react.dev/)
- ReactRouter -> [ReactRouter](https://reactrouter.com/en/main)
- Style -> [TailwindCSS](https://tailwindcss.com/)
- State -> [zustand](https://docs.pmnd.rs/zustand/) (avec les middlewares `immer` et `persist`)
- build -> [Vite](https://vitejs.dev/)
- PWA -> [VitePWA](https://vite-pwa-org.netlify.app/) plugin
- Import/Export -> [@zip.js/zip.js](https://gildas-lormeau.github.io/zip.js/)

## Roadmap

- [x] Setup PWA app
- [x] UX
  - [x] Basic Routing / screens
  - [x] Screens
    - [x] Kids list
    - [x] Kid
    - [x] Workshops list
    - [x] Workshop
    - [ ] Admin
      - [ ] Kids/Workshop status table
      - [ ] Kids progress page w/ print view
  - [x] Bookmarking
  - [x] Take/save picture
  - [x] Lists section avec navigation
- [x] Data/StateManagement
  - [x] LoocalStorage sync
  - [x] Images capture
  - [ ] Other device sync via BT/NFC
- [x] Import/Export .zip
- [ ] Much more

## Development

The usual, to run the dev server:

```
npm install
npm run dev
```
