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

Le parcours reprend uniquement les éléments présents dans la version précédente
(Radio France et Master Cybersecurity & Cloud Computing). Les dates, missions,
résultats et le statut actuel restent à compléter depuis un CV ou des informations
confirmées par Corentin. Les périodes absentes sont omises à l’affichage.

Portal dispose d’un schéma fonctionnel explicitement légendé. Pour utiliser une
vraie capture, ajouter `public/projects/portal.webp`, puis renseigner
`imageURL: "/projects/portal.webp"` et un `imageAlt` descriptif dans son entrée.
La capture remplace le schéma dans la carte et dans la fiche détaillée.

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
