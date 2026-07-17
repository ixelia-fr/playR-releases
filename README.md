<div align="center">

# 🎮 playR

### Toute votre bibliothèque de jeux, réunie.

**Steam · Epic · GOG · Amazon** dans une seule interface élégante — navigable à la manette,
avec un **mode TV** plein écran, et un **serveur qui tourne chez vous**.

[⬇️ Télécharger](#-téléchargement) · [🖥️ Installer un serveur](#-installer-un-serveur) · [🔑 Connecter ses comptes](#-connecter-ses-comptes)

![Bibliothèque playR](assets/library.jpg)

</div>

---

## ✨ Ce que ça fait

- **Multi-plateforme** — Steam (bibliothèque **famille** incluse), Epic, GOG, Amazon, fusionnés. Les doublons cross-plateforme sont regroupés automatiquement.
- **Jouer & installer** — détecte les jeux installés sur ce PC, lance / installe / désinstalle via le bon launcher.
- **100 % manette** — navigation complète manette, clavier et souris.
- **Mode TV (Big Picture)** — plein écran, carrousels, fiche détaillée, tri & filtres, sons — tout à la manette.
- **Métadonnées riches** — jaquettes, descriptions, notes critiques (**IGDB**), durées de jeu (**HowLongToBeat**).
- **Notes, listes & statuts** — notez, classez, marquez à faire / en cours / terminé.
- **Auto-hébergé & privé** — votre serveur tourne chez vous. Vos données restent à vous.

<div align="center">

![Mode TV](assets/tv.jpg)

</div>

---

## 🧭 Comment ça marche

playR = **un serveur** (héberge la bibliothèque) + **des clients** (les PC qui s'y connectent).

1. **Le serveur** tourne sur un PC, un CasaOS, un NAS ou un Proxmox.
2. **Le client** (app Windows) se connecte à l'adresse du serveur (ex. `192.168.1.10:3000`).
3. Chacun **connecte ses comptes** (Steam, Epic…) et synchronise.

---

## 💾 Téléchargement

**Windows — un seul installeur, deux lanceurs.**

➡️ **[Télécharger `playR-Setup.exe`](https://github.com/ixelia-fr/playR-releases/releases/latest)**

À l'installation, cochez :
- ✅ **Client** (recommandé — sur chaque PC).
- ⬜ **Serveur** (optionnel — seulement si vous voulez héberger la bibliothèque sur CE PC ; inutile si vous avez déjà un CasaOS/NAS).

> Windows peut afficher « éditeur inconnu » → *Informations complémentaires* → *Exécuter quand même*.
> Le client se met à jour tout seul.

---

## 🖥️ Installer un serveur

Le serveur est une **image Docker** → il tourne partout.

### CasaOS
**App Store** → *Installer une app personnalisée* → icône **Importer** (en haut à droite) → collez [`docker-compose.yml`](docker-compose.yml) → **Envoyer** → **Installer** → **Ouvrir**.
(Détails pas à pas dans la [doc](https://ixelia-fr.github.io/playR-releases/docs.html#casaos).)

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

| Service | Ce qu'il faut |
|---|---|
| **Steam** | Connexion Steam (Connector, famille incluse) — ou SteamID + clé API |
| **Epic** | Code d'autorisation (OAuth) |
| **GOG** | Identifiant GOG |
| **Amazon** | Token Amazon Games |
| **IGDB** (jaquettes, notes) | Client ID + Secret via [Twitch dev console](https://dev.twitch.tv/console) |
| **HowLongToBeat** | Rien (public) |

Guide détaillé (dont l'obtention de la clé IGDB) : [`docs/CONNEXIONS.md`](../docs/CONNEXIONS.md).

---

<div align="center">
<sub>playR — votre bibliothèque de jeux auto-hébergée.</sub>
</div>
