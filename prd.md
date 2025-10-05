# PRD — SRI Generator (Blazor WebAssembly)

## 1. But

Fournir une petite application Blazor WebAssembly hébergeable sur GitHub Pages qui génère des Subresource Integrity (SRI) hashes à partir d'une URL. L'application doit être simple, accessible, mobile-first et fonctionner entièrement côté client (pas de serveur requis).

## 2. Contexte et motivation

Les développeurs front-end ont besoin de générer des valeurs SRI pour protéger le chargement de ressources tierces. Le site doit offrir une alternative légère et open-source à des services existants comme https://www.srihash.org/ et pouvoir être déployé sur GitHub Pages.

## 3. Scope

### Inclus
- Saisie d'une URL ou d'un texte (optionnel) contenant la ressource à hasher.
- Sélection de l'algorithme : SHA-256, SHA-384, SHA-512.
- Bouton `Hash` qui calcule et affiche le SRI (format `shaXXX-<base64>`).
- Copie du résultat dans le presse-papiers.
- Affichage d'un exemple d'attribut `integrity` et `crossorigin`.
- UI responsive, minimale, accessible.
- Déploiement automatisable sur GitHub Pages (instructions dans README).

### Exclu
- Téléchargement serveur ou crawling d'URL côté serveur.
- Vérification de la disponibilité CORS de l'URL (si fetch échoue, afficher erreur claire).
- Gestion d'identifiants, analytics ou télémetrie par défaut.

## 4. Utilisateurs cibles

- Développeurs front-end et intégrateurs.
- Mainteneurs de sites statiques.

## 5. User stories

1. En tant que développeur, je saisis une URL et je choisis SHA-384. Je clique `Hash` et je reçois la valeur SRI prête à coller.
2. En tant que mainteneur, je veux pouvoir copier le résultat en un clic.
3. En tant qu'utilisateur mobile, je veux que l'interface s'adapte à mon écran.
4. En tant qu'utilisateur hors-ligne après chargement, je veux pouvoir recalculer des hashes si j'ai collé le fichier localement.

## 6. Fonctionnalités détaillées

### 6.1 Entrée
- Champ principal texte `URL or paste resource`.
- Validation minimale : non vide, protocole `http`/`https` ou données encodées (voir notes).

### 6.2 Sélecteur d'algorithme
- Choix radio/button group : SHA-256 (par défaut), SHA-384, SHA-512.

### 6.3 Bouton Hash
- Label `Hash`.
- Actions :
  - Si entrée est une URL : tenter de `fetch` la ressource (GET, mode `cors`), lire `ArrayBuffer`.
  - Si entrée ressemble à données encodées (ex: `data:`) ou texte collé : convertir en `Uint8Array`.
  - Calculer digest via Web Crypto API `crypto.subtle.digest`.
  - Encoder le résultat en base64url standard pour SRI (remplacer `+` `/` et `=`? Note: SRI utilise base64 standard avec padding; conserver `=` padding). Format final : `sha256-<base64>`.
  - Afficher le résultat en lecture seule.

### 6.4 Copier
- Bouton `Copy` collera la chaîne SRI dans le presse-papiers.
- Indicateur visuel bref `Copied`.

### 6.5 Messages d'erreur
- URL non valide.
- Fetch échoué (CORS ou réseau) => expliquer que la ressource ne permet peut-être pas l'accès cross-origin.
- Erreur de hashing => message générique et option pour afficher console trace.

### 6.6 Accessibilité
- Tous les contrôles accessibles au clavier.
- Labels explicites, attributs `aria` adéquats.
- Contraste conforme WCAG AA.

## 7. Architecture technique

- Frontend : Blazor WebAssembly (.NET 7+ recommandé).
- Pas d'API serveur.
- Usage principal des APIs JS via JSInterop pour APIs web non disponibles en Blazor (ex: base64 adaptatif) si nécessaire. Toutefois `crypto.subtle` est accessible via `IJSRuntime`.
- Fichiers statiques optimisés pour GitHub Pages.

## 8. Composants UI (pages)

### Page unique (Single Page)
- Header : titre, court descriptif, lien GitHub.
- Formulaire principal : input URL, algorithme, bouton `Hash`.
- Zone résultat : champ immuable avec le SRI, bouton `Copy`, instructions d'exemple `integrity`.
- Footer : licence MIT, instructions déploiement GitHub Pages.

## 9. Déploiement sur GitHub Pages

- Build script `dotnet publish -c Release` puis copier `wwwroot` vers branche `gh-pages` ou utiliser GitHub Actions.
- Fournir workflow GitHub Actions prêt à l'emploi pour build + deploy vers `gh-pages` (push automatique).
- Fichier `README.md` avec instructions.

## 10. Sécurité et confidentialité

- Traitement local uniquement. Ne pas logguer ni envoyer l'URL ni le contenu à des services externes.
- Mentionner clairement que l'app effectue des requêtes cross-origin et que certaines URLs peuvent refuser l'accès.
- Licence MIT.

## 11. Non-fonctionnels

- Performance : réponse < 1s pour ressources < 5MB (dépend du réseau).
- Compatibilité navigateurs : Chrome, Edge, Firefox, Safari modernes qui supportent Web Crypto et WASM.
- Taille : application optimisée pour < 1MB gzippé côté initial (objectif raisonnable).

## 12. Tests et critères d'acceptation

- Entrée URL publique accessible CORS : calcul correct pour SHA-256/384/512.
- Entrée texte local/paste : hash correct.
- Résultat copiable en un clic.
- Comportement d'erreur clair pour échecs fetch.
- Déploiement fonctionnel sur GitHub Pages via workflow fourni.

## 13. Roadmap minimal

1. MVP : hashing URL+paste, trois algos, copy, docs, GH Actions.
2. Amélioration : thèmes, historique local, drag & drop de fichier.
3. Internationalisation.

## 14. Dépendances

- .NET 9
- GitHub Actions

## 15. Livrables

- Code source sur GitHub avec README et licence.
- Workflow GH Actions pour déploiement.
- Tests unitaires basiques pour fonctions utilitaires (parsing, encodage).
