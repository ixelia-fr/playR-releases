# Connecter ses comptes & clés (chaque utilisateur, ses propres accès)

Un serveur playR démarre **vide**. Chaque personne connecte **ses propres comptes**
et met **ses propres clés** dans **⚙ Paramètres**. Rien n'est partagé, rien n'est pré-rempli.

> On ne « télécharge » aucune bibliothèque : c'est **votre** bibliothèque, alimentée par
> **vos** comptes.

---

## Steam
Deux options, dans Paramètres → Steam :
- **Steam Connector (recommandé)** : connexion avec identifiants Steam (+ Steam Guard).
  Inclut la **bibliothèque famille**. Rien d'autre à faire.
- **API (optionnel)** : `SteamID64` + `clé API Steam` (https://steamcommunity.com/dev/apikey).

## Epic Games
Paramètres → Epic → **Se connecter** : ouvre la page Epic, copiez le **code d'autorisation**
affiché, collez-le. (Lien : https://www.epicgames.com/id/api/redirect?clientId=34a02cf8f4414e29b15921876da36f9a&responseType=code)

## GOG
Paramètres → GOG : renseignez votre **identifiant GOG**.

## Amazon Games
Paramètres → Amazon : collez votre **token** Amazon Games.

## IGDB (métadonnées : jaquettes, notes, descriptions) — clé PERSONNELLE requise
IGDB passe par un compte **Twitch développeur** :
1. https://dev.twitch.tv/console → **Register Your Application**.
2. Nom au choix, OAuth Redirect URL : `http://localhost`, Catégorie : *Application Integration*.
3. Récupérez le **Client ID** et générez un **Client Secret**.
4. Paramètres → IGDB : collez **Client ID** + **Client Secret**.

## HowLongToBeat (durées de jeu)
**Aucune clé** : ça marche directement (service public).

---

### En résumé
| Service | Ce qu'il faut | Clé perso ? |
|---|---|---|
| Steam | Connector (login) ou SteamID + clé API | selon l'option |
| Epic | Code d'autorisation | non (OAuth) |
| GOG | Identifiant GOG | non |
| Amazon | Token | oui |
| IGDB | Client ID + Secret (Twitch dev) | **oui** |
| HLTB | rien | non |
