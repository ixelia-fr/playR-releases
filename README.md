<div align="center">

# 🎮 playR

### Toute votre bibliothèque de jeux, réunie.

**Steam · Epic · GOG · Amazon · EA · Ubisoft · Battle.net** dans une seule interface élégante —
plus le cloud gaming **GeForce NOW** et **Amazon Luna**. Navigable à la manette, avec un
**mode TV** plein écran, et un **serveur qui tourne chez vous**.

[⬇️ Télécharger](#-téléchargement) · [🖥️ Installer un serveur](#-installer-un-serveur) · [🔑 Connecter ses comptes](#-connecter-ses-comptes)

![Bibliothèque playR](assets/library.jpg)

</div>

---

## ✨ Ce que ça fait

- **Sept plateformes, une seule bibliothèque** — Steam (bibliothèque **famille** incluse), Epic, GOG, Amazon, EA, Ubisoft Connect et Battle.net, avec regroupement des jeux similaires.
- **Cloud gaming** — vos jeux jouables sur **GeForce NOW** et **Amazon Luna** sont repérés et se lancent depuis playR, sans rien installer.
- **Jouer & installer** — installez et lancez vos jeux directement depuis votre bibliothèque, en choisissant la boutique quand vous les possédez plusieurs fois.
- **Envies & Promos** — vos wishlists Steam et GOG, avec les prix et promotions comparés sur Steam, GOG, Epic, Kinguin et une trentaine de boutiques, et un badge sur les jeux qui sortent bientôt.
- **Jeux gratuits à réclamer** — playR vous prévient quand une boutique offre un jeu et ouvre la page pour le récupérer.
- **Fiches enrichies** — jaquettes, description, note critique, durée de jeu, configuration requise, temps joué (**IGDB**, **HowLongToBeat**).
- **Jaquettes personnalisées** — remplacez un visuel moche ou manquant par un autre, via **SteamGridDB**.
- **Tableau de bord** — répartitions par plateforme, genre, statut, note et année, temps de jeu, jeux jamais lancés, valeur estimée de la collection.
- **Mode TV** — plein écran à la manette, sur la télé du salon comme sur votre écran de PC, avec tirage au sort « Que jouer ce soir ? » et écran de veille en diaporama.
- **Notes, listes & statuts** — notez, créez vos listes, marquez à faire / en cours / terminé, masquez ce qui vous encombre.
- **9 langues** — français, anglais, allemand, espagnol, italien, portugais, néerlandais, polonais, russe, japonais.
- **100 % manette** — navigation complète manette, clavier et souris.
- **Auto-hébergé & privé** — votre serveur tourne chez vous, et n'accepte que les appareils que vous avez autorisés. Vos données restent à vous.

<div align="center">

![Mode TV](assets/tv.jpg)

</div>

---

## 🧭 Comment ça marche

playR = **un serveur** (héberge la bibliothèque) + **des clients** (les PC qui s'y connectent).

1. **Le serveur** tourne sur un PC, un CasaOS, un NAS ou un Proxmox.
2. **Le client** (app Windows) se connecte à l'adresse du serveur (ex. `192.168.1.10:3000`).
3. Chacun **connecte ses comptes** (Steam, Epic…) et synchronise.

> Le serveur n'ouvre à personne : chaque appareil est **autorisé une fois** avec un code
> (automatique quand le serveur est sur le même PC ; affiché dans la fenêtre « playR Serveur »
> ou dans `docker compose logs playr` sinon).

---

## 💾 Téléchargement

**Windows — un seul installeur, deux lanceurs.**

➡️ **[Télécharger `playR-Setup.exe`](https://github.com/ixelia-fr/playR-releases/releases/latest)**

**L'installeur ne pose aucune question** : il pose l'application et le serveur, et au premier
lancement playR cherche votre bibliothèque — sur ce PC comme sur le réseau — et vous la fait
confirmer.

> Windows peut afficher « éditeur inconnu » → *Informations complémentaires* → *Exécuter quand même*.
> L'application se met à jour toute seule, serveur compris.

---

## 🖥️ Installer un serveur

Le serveur est une **image Docker** → il tourne partout.

### CasaOS
**App Store** → *Installer une app personnalisée* → icône **Importer** (en haut à droite) → collez [`docker-compose.yml`](docker-compose.yml) → **Envoyer** → **Installer** → **Ouvrir**.
(Détails pas à pas dans la [doc](https://playrgameslauncher.com/docs.html#casaos).)

### NAS / Synology / Proxmox / Docker
```bash
mkdir -p /DATA/AppData/playr/data
docker compose up -d      # avec le docker-compose.yml fourni
```
> Sur **Proxmox** : un conteneur LXC avec Docker, ou une petite VM Docker.
> Mise à jour : `docker compose pull && docker compose up -d`.

Adresse à donner aux clients : `http://[IP-de-la-machine]:3000`.

> ⚠️ L'image `ghcr.io/ixelia-fr/playr` doit être **publique** pour être téléchargeable.

---

## 🔑 Connecter ses comptes

Chaque serveur démarre **vide** : vous connectez **vos propres** comptes dans **⚙ Paramètres**.

Pour la plupart des plateformes, playR ouvre une **fenêtre de connexion officielle** : vous vous
identifiez chez eux, et c'est fini. Le compte est rattaché au **serveur**, qui synchronise ensuite
tout seul, application fermée.

| Service | Ce qu'il faut |
|---|---|
| **Steam** | Identifiant + mot de passe Steam, puis Steam Guard (famille incluse) — ou SteamID + clé API |
| **Epic** | Une fenêtre de connexion Epic |
| **GOG** | L'URL de votre profil public |
| **Amazon** | Un bouton dans l'app (l'appli Amazon Games doit être installée sur ce PC) |
| **EA** | Une fenêtre de connexion EA |
| **Ubisoft Connect** | Une fenêtre de connexion Ubisoft (double authentification comprise) |
| **Battle.net** | Une fenêtre de connexion Battle.net |
| **GeForce NOW · Amazon Luna** | Un interrupteur / votre niveau d'abonnement |
| **Jaquettes & métadonnées** | **Rien — c'est inclus** (IGDB, HowLongToBeat) |

Guide détaillé : [`docs/CONNEXIONS.md`](../docs/CONNEXIONS.md).

---

<div align="center">
<sub>playR — votre bibliothèque de jeux auto-hébergée.</sub>
</div>
