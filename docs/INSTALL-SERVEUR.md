# Installer un serveur playR (CasaOS / NAS / Docker)

Le **serveur** héberge la bibliothèque ; les **apps clientes** (Windows) s'y connectent
via son adresse réseau. Trois façons de faire tourner le serveur :

| Vous avez… | Solution |
|---|---|
| Un PC Windows | L'**app serveur** (installeur `playR-Setup.exe`, cocher « Serveur »). |
| Un **CasaOS** | Import 1-clic (ci-dessous). |
| Un **NAS / Docker** | `docker compose` (ci-dessous). |

> ⚠️ **Prérequis unique** : l'image `ghcr.io/ixelia-fr/playr` doit être **publique**
> (GitHub → repo playR → *Packages* → `playr` → *Package settings* → *Change visibility* → **Public**).

---

## CasaOS (import 1-clic)

1. CasaOS → **Applications** → **+** → **Installer une app personnalisée** → **Importer**.
2. Collez le contenu de [`docker-compose.yml`](../docker-compose.yml).
3. **Installer**. playR apparaît dans vos apps.
4. Adresse à donner aux clients : `http://[IP-du-CasaOS]:3000`.

## NAS / Docker Compose

```bash
mkdir -p /DATA/AppData/playr/data
# Récupérez docker-compose.yml, puis :
docker compose up -d
```
Adresse à donner aux clients : `http://[IP-de-la-machine]:3000`.

## Mise à jour du serveur

**Automatique (inclus par défaut).** Le compose fourni embarque un petit service
`playr-updater` (Watchtower) qui met playR à jour **tout seul chaque nuit**.
Rien à configurer, rien à taper. Il ne touche qu'au conteneur `playr`.

**Manuelle (repli).** Si vous préférez déclencher vous-même, ou si vous avez
installé l'**image seule** (sans le compose), la notification 🔔 de l'app affiche
la commande :

```bash
docker compose pull && docker compose up -d
```

---

## Côté client (chaque PC)

Ouvrez l'app **playR**, écran **« Adresse du serveur »**, saisissez l'adresse
du serveur (ex. `192.168.1.104:3000`). Vous pouvez en changer à tout moment
(menu ⚙ → « Changer de serveur »).
