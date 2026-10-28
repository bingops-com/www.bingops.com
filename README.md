# BingOps portfolio

Portfolio de Corentin Guyon, réalisé avec React et Vite et publié sur
[www.bingops.com](https://www.bingops.com/).

## Développement

```sh
npm install
npm run dev
```

`npm run build` produit le site statique dans `dist/`.
`npm run preview` sert ce build localement.

Dans le workspace Coder, `npm run dev` écoute sur `0.0.0.0:5173` et autorise
le nom `5173.dev.lab.bingo`. Le serveur apparaît automatiquement dans
[Dev](https://dev.lab.bingo/) et s’ouvre sur [le port 5173](https://5173.dev.lab.bingo/).
Pour un autre serveur, saisir son port dans « Ouvrir un port » du dashboard.
Les aperçus utilisent la session Coder et l’accès privé existant.

## Contenu

- `src/portfolio.json` : profil, expériences, formation, compétences et liens.
- `src/projects.json` : projets, catégories, technologies, documentation et visuels.
- `src/articles.json` : sélection d’articles.
- `src/components/portfolio/` : navigation, schémas et fiches projet.
- `src/portfolio.css` : styles de la refonte et thèmes clair/sombre.

Les descriptions de LabOps et Portal proviennent de leurs dépôts :
[LabOps](https://github.com/bingops-com/labops),
[architecture GitOps](https://github.com/bingops-com/labops/blob/master/apps/README.md),
[Cluster API](https://github.com/bingops-com/labops/blob/master/capi/README.md),
[Portal](https://github.com/bingops-com/portal).

Le statut actuel est confirmé par Corentin : en CDI chez SII, actuellement en
mission chez Thales. Il figure dans l’accueil, le parcours et les métadonnées.
Radio France provient de la version précédente ; la région de Nice et IPSSI
(2023–2025) proviennent du [profil LinkedIn fourni](https://fr.linkedin.com/in/corentin-guyon).
L’intitulé du poste, les dates d’expériences et les missions détaillées restent
à compléter quand ils seront connus ; les champs absents sont omis.

### Capture de Portal

`public/projects/portal.jpg` est une capture réelle du Portal en fonctionnement,
réalisée le 28 octobre 2026. Elle remplace le schéma dans la carte et la fiche
projet. Les indicateurs visibles correspondent à cet instant.

Pour renouveler la capture depuis un environnement autorisé à lire le portail :

```sh
CHROMIUM=/usr/bin/chromium npm run capture:portal
```

Le script utilise par défaut le service interne du cluster. Pour une autre
adresse accessible, définir `PORTAL_CAPTURE_URL`. Il ouvre une nouvelle session
éphémère en thème clair, attend les widgets et capture le viewport 1600 × 1150.
Il ne modifie aucune configuration de Portal. Ne pas utiliser une URL contenant
un jeton ; vérifier le contenu visible avant de publier une nouvelle capture.

## Contact

Copier `.env.example` vers `.env` et renseigner les trois variables publiques
EmailJS avant le build pour activer le formulaire. Le modèle EmailJS doit utiliser
`user_name`, `user_email` et `message`. Sans configuration complète, le site
propose le contact LinkedIn. Le formulaire ne simule jamais un envoi réussi.

Le build Docker actuellement défini dans LabOps ne transmet pas ces variables ;
le contact LinkedIn reste donc le chemin disponible avec ce build.

## Vérification

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Les tests couvrent les projets et leurs filtres, les fiches au clavier, la
navigation mobile, les préférences de thème, le stockage indisponible, le
débordement horizontal et le contact. Les tests interceptent EmailJS : aucun
message réel n’est envoyé. Sans configuration, ils vérifient le lien de repli.
Avec les variables de test de la CI, ils vérifient échec, conservation du message,
nouvel essai et confirmation.

Le workflow `portfolio-checks.yml` construit le site avec puis sans configuration
de contact. L’artefact `portfolio-browser-review` contient le rapport et les
captures desktop/mobile en clair et sombre.

## Skill de design

Le skill officiel Anthropic
[frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
est installé dans `.agents/skills/frontend-design/`, avec sa licence Apache 2.0,
dans un commit antérieur à la refonte. Il est disponible pour les sessions qui
ouvrent cette branche à partir du prochain tour.

## Déploiement

Le dépôt reste un site statique React/Vite. La livraison suit le processus
existant : PR vers `main`, revue, puis construction de l’image dans LabOps.
Cette branche ne modifie pas les manifests d’infrastructure.

## Crédits

La version initiale du portfolio était basée sur un design Figma de
[Sagar Shah](https://www.figma.com/@shahsagarm).
