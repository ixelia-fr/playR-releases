// Mesure d'audience du site vitrine — Matomo (ixelia.matomo.cloud, site n° 14).
//
// ─────────────────────────────────────────────────────────────────────────────
// POURQUOI CE FICHIER EXISTE, ET PAS UN SIMPLE COPIER-COLLER DU CODE MATOMO
// ─────────────────────────────────────────────────────────────────────────────
// Le site vitrine est en dix langues, chaque langue vivant dans son propre
// dossier (`/en/docs.html`…). Le code de suivi par défaut de Matomo compte des
// pages vues et rien d'autre : il ne dit ni dans quelle langue la page était
// affichée, ni quelle version on proposait au téléchargement, ni si le visiteur
// a lu la page ou l'a quittée au premier écran. Ce sont précisément les trois
// questions auxquelles ce site doit répondre.
//
// ⚠️ Ce fichier est chargé par les CINQ pages françaises, et `site/build.mjs`
// recopie la balise <script> telle quelle dans les neuf autres langues (le
// contenu d'un <script> est opaque au traducteur). Une seule copie à maintenir.
//
// ─────────────────────────────────────────────────────────────────────────────
// SANS COOKIE — ET DONC SANS BANDEAU
// ─────────────────────────────────────────────────────────────────────────────
// `disableCookies` : Matomo reconnaît alors un visiteur par une empreinte
// technique de courte durée, pas par un cookie déposé sur sa machine. C'est ce
// qui fait entrer la mesure dans l'exemption de consentement de la CNIL
// (mesure d'audience, pas de recoupement entre sites, IP tronquée côté serveur,
// conservation des journaux bruts sous 25 mois) — donc AUCUN bandeau cookies à
// poser sur le site, et les mentions légales restent lisibles.
//
// Contrepartie assumée : un visiteur qui revient trois jours plus tard est
// compté comme un nouveau visiteur. Sur un site vitrine, savoir si la page est
// lue et si le téléchargement part vaut mieux qu'un taux de retour exact.
//
// ⚠️ Ne PAS ajouter `setDoNotTrack` sans arbitrage : ça n'est pas une obligation
// légale en France, et ça retirerait silencieusement une part des visiteurs des
// statistiques. Le droit d'opposition passe par la case à cocher des mentions
// légales, qui coupe tout (cf. « Droit d'opposition » plus bas).
//
// ─────────────────────────────────────────────────────────────────────────────
// CE QUI EST ENVOYÉ (contrat — à tenir à jour avec `docs/MESURE-AUDIENCE.md`)
// ─────────────────────────────────────────────────────────────────────────────
// Dimensions de VISITE  : 1 langue du site · 2 provenance · 3 version publiée
// Dimensions d'ACTION   : 4 emplacement du clic · 5 profondeur · 6 section
// Événements            : Téléchargement · Lecture · Navigation · Langue
//
// Les index des dimensions sont ceux déclarés dans Matomo pour CE site : les
// changer d'un côté sans l'autre écrit dans la mauvaise colonne, en silence.
(() => {
  'use strict';

  const MATOMO = 'https://ixelia.matomo.cloud/';
  const SITE = '14';

  // ── Droit d'opposition ─────────────────────────────────────────────────────
  // Le refus est stocké sur NOTRE domaine, et pas via le formulaire de retrait
  // fourni par Matomo : celui-ci repose sur un cookie posé sur le domaine
  // matomo.cloud, donc un cookie tiers — que les navigateurs bloquent
  // désormais par défaut, et qui de toute façon n'existe pas ici puisqu'on
  // suit sans cookie. Un interrupteur qui ne marche qu'une fois sur deux ne
  // vaut rien : celui-là marche toujours.
  //
  // Le refus coupe la mesure AVANT même le chargement de Matomo — rien n'est
  // envoyé, rien n'est téléchargé. C'est l'interrupteur branché sur la case des
  // mentions légales (`mentions-legales.html`).
  const CLE_REFUS = 'playr:mesure-refusee';
  const lire = (cle) => { try { return localStorage.getItem(cle); } catch { return null; } };
  const ecrire = (cle, val) => {
    try { if (val === null) localStorage.removeItem(cle); else localStorage.setItem(cle, val); } catch { /* navigation privée */ }
  };

  window.playrMesure = {
    estRefusee: () => lire(CLE_REFUS) === 'oui',
    refuser() { ecrire(CLE_REFUS, 'oui'); },
    accepter() { ecrire(CLE_REFUS, null); },
  };

  if (window.playrMesure.estRefusee()) return;

  // ── On ne mesure QUE le domaine public ─────────────────────────────────────
  // Le site se relit aussi en local (`node site/build.mjs` + un serveur
  // statique) avant chaque mise en ligne. Sans ce garde-fou, chaque page ouverte
  // en développement viendrait grossir les statistiques de production, et une
  // relecture de dix pages ressemblerait à un visiteur assidu.
  //
  // Pour vérifier la mesure en local malgré tout, depuis la console :
  //   localStorage.setItem('playr:mesure-forcee', 'oui')
  if (!/(^|\.)playrgameslauncher\.com$/.test(location.hostname)
      && lire('playr:mesure-forcee') !== 'oui') return;

  const D_LANGUE = 1;       // visite — langue de la page affichée
  const D_PROVENANCE = 2;   // visite — site, ou app-* si le lien vient de playR
  const D_VERSION = 3;      // visite — dernière version publiée
  const D_EMPLACEMENT = 4;  // action — où, dans la page, le clic a eu lieu
  const D_PROFONDEUR = 5;   // action — jusqu'où la page a été descendue
  const D_SECTION = 6;      // action — section atteinte

  // ⚠️ TOUJOURS pousser via `window._paq`, JAMAIS via une référence gardée dans
  // une variable. Au chargement, `matomo.js` vide le tableau `_paq` et REMPLACE
  // `window._paq` par un objet `{ push }` qui exécute les commandes. Une
  // référence capturée au démarrage pointe alors sur un tableau mort : tout ce
  // qui est envoyé ensuite — téléchargements, défilement, fin de page — part
  // dans le vide, SANS la moindre erreur en console.
  //
  // Piège vérifié en local avant livraison : la page vue arrivait bien, et pas
  // un seul événement. C'est exactement le genre de panne qui ne se voit qu'au
  // bout d'un mois, en constatant un rapport vide.
  const pousser = (...commande) => { (window._paq = window._paq || []).push(commande); };

  // ── Nom de page indépendant de la langue ───────────────────────────────────
  // `/de/docs.html` et `/docs.html` sont deux URLs différentes, donc deux lignes
  // différentes dans le rapport « Pages ». Ce nom-là les réunit : c'est lui qui
  // porte les événements de lecture, pour pouvoir répondre à « la doc est-elle
  // lue ? » sans additionner dix lignes à la main.
  const PAGES = {
    'docs.html': 'Documentation',
    'faq.html': 'FAQ',
    'comparatif.html': 'Comparatif',
    'mentions-legales.html': 'Mentions légales',
  };
  const page = PAGES[location.pathname.split('/').pop()] || 'Accueil';

  // ── Langue réellement affichée ─────────────────────────────────────────────
  // Lue sur <html lang>, et non sur les préférences du navigateur : Matomo
  // remonte déjà celles-ci de son côté, et les deux ne coïncident pas (un
  // visiteur allemand qui atterrit sur la page française est exactement le cas
  // qu'on veut voir).
  const langue = (document.documentElement.lang || 'fr').slice(0, 2);

  // ── Provenance ─────────────────────────────────────────────────────────────
  // L'application playR ouvre la documentation dans le navigateur ; ses liens
  // portent `?src=app-…`. Sans mémorisation, la provenance serait écrasée dès la
  // page suivante (dimension de visite : la dernière valeur écrite gagne), et
  // « arrivé depuis l'app » deviendrait « arrivé sur le site ». D'où le report
  // en stockage de SESSION — vidé à la fermeture de l'onglet, et couvert par la
  // même exemption que la mesure elle-même.
  let provenance = (new URLSearchParams(location.search).get('src') || '').slice(0, 60);
  try {
    if (provenance) sessionStorage.setItem('playr:src', provenance);
    else provenance = sessionStorage.getItem('playr:src') || 'site';
  } catch { provenance = provenance || 'site'; }

  pousser('setCustomDimension', D_LANGUE, langue);
  pousser('setCustomDimension', D_PROVENANCE, provenance);

  // La version arrive d'un `fetch` (cf. `version.js`), donc APRÈS la page vue.
  // Ce n'est pas un problème : une dimension de visite se rattache à la visite
  // entière dès qu'une requête la porte — et le clic de téléchargement, lui,
  // partira toujours avec la bonne valeur.
  const versionConnue = () => document.documentElement.dataset.playrVersion || '';
  const poserVersion = (v) => { if (v) pousser('setCustomDimension', D_VERSION, v); };
  poserVersion(versionConnue());
  document.addEventListener('playr:version', (e) => poserVersion(e.detail));

  // ── Section d'arrivée ──────────────────────────────────────────────────────
  // Un lien direct vers `docs.html#casaos` dit à lui seul ce que le visiteur
  // cherchait. L'ancre n'apparaît pas dans l'URL vue par Matomo (les fragments
  // sont volontairement écartés pour ne pas éclater le rapport « Pages »), on la
  // pose donc sur la page vue.
  const ancre = decodeURIComponent((location.hash || '').replace(/^#/, '')).slice(0, 80);

  pousser('setTrackerUrl', MATOMO + 'matomo.php');
  pousser('setSiteId', SITE);
  pousser('disableCookies');
  // Les événements de fin de page partent pendant que l'onglet se ferme : une
  // requête image classique serait tuée avant d'aboutir, `sendBeacon` non.
  pousser('alwaysUseSendBeacon');
  pousser('trackPageView', undefined, ancre ? { [`dimension${D_SECTION}`]: ancre } : undefined);
  // Liens sortants (GitHub, CNIL…) et fichiers téléchargés, gratuitement.
  // ⚠️ Pas de `enableHeartBeatTimer` : il enverrait un signal toutes les 15 s
  // pour rien, alors que l'événement de fin de page porte déjà le temps passé,
  // et mesuré uniquement quand l'onglet était visible — donc plus juste.
  pousser('enableLinkTracking');

  // Le tracker est chargé depuis `ixelia.matomo.cloud`, PAS depuis le
  // `cdn.matomo.cloud` que propose Matomo par défaut. Deux raisons :
  //   · le CDN est un domaine partagé par tous les comptes Matomo Cloud, donc
  //     bloqué par des listes de filtrage — et par des résolveurs DNS de réseau
  //     local — qui laissent passer le domaine du compte (constaté ici : le CDN
  //     répond 0.0.0.0, l'instance répond normalement) ;
  //   · une seule et même origine pour le script et pour l'endpoint de collecte,
  //     donc une résolution DNS et une poignée de main TLS au lieu de deux.
  // Le fichier servi est strictement le même.
  (() => {
    const d = document;
    const g = d.createElement('script');
    const s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = MATOMO + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  })();

  // Une dimension d'action sans valeur ne doit pas partir du tout : envoyée
  // vide, elle écrase la colonne avec une chaîne nulle au lieu de la laisser
  // libre, et le rapport se remplit de lignes fantômes.
  const dims = (obj) => {
    const out = {};
    for (const [cle, val] of Object.entries(obj || {})) if (val) out[cle] = val;
    return Object.keys(out).length ? out : undefined;
  };

  const evenement = (categorie, action, nom, valeur, d) =>
    pousser('trackEvent', categorie, action, nom, valeur, dims(d));

  // ───────────────────────────────────────────────────────────────────────────
  // LECTURE : jusqu'où la page est descendue, et pendant combien de temps
  // ───────────────────────────────────────────────────────────────────────────
  // Trois mesures complémentaires, parce qu'aucune ne suffit seule :
  //   · les PALIERS (25/50/75/100 %) donnent l'entonnoir de défilement — combien
  //     de visiteurs atteignent la section « Télécharger », tout en bas ;
  //   · les SECTIONS réellement traversées disent QUOI a été lu (indispensable
  //     sur la doc, qui fait vingt-six sections) ;
  //   · le TEMPS PASSÉ distingue « descendu jusqu'en bas » de « lu ».
  const PALIERS = [25, 50, 75, 100];
  const franchis = new Set();
  const sectionsVues = new Set();
  let profondeurMax = 0;
  let derniereSection = ancre || '';

  // Sections = les ancres réelles du contenu. On écarte tout le reste (un
  // <input id> de menu n'est pas une section), sinon le rapport se remplirait
  // d'identifiants techniques.
  const sections = [...document.querySelectorAll('section[id], article[id], h2[id]')];

  const hauteurDocument = () => Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
  );

  const profondeur = () => {
    const total = hauteurDocument();
    const vu = (window.scrollY || document.documentElement.scrollTop) + window.innerHeight;
    if (total <= 0) return 100;
    return Math.max(0, Math.min(100, Math.round((vu / total) * 100)));
  };

  const palier = (p) => {
    if (p >= 100) return '100 %';
    if (p >= 75) return '75 %';
    if (p >= 50) return '50 %';
    if (p >= 25) return '25 %';
    return '0 %';
  };

  // Une page plus courte que l'écran est déjà « lue » à l'affichage : y faire
  // tomber les quatre paliers d'un coup au chargement n'apprendrait rien. Elle
  // est comptée à 100 % une fois seulement, et après quelques secondes de
  // présence — sans quoi un simple rebond passerait pour une lecture.
  const pageCourte = () => hauteurDocument() <= window.innerHeight + 40;

  const marquerSection = (id) => {
    if (!id || sectionsVues.has(id)) return;
    sectionsVues.add(id);
    derniereSection = id;
    evenement('Lecture', 'Section', id, undefined, {
      [`dimension${D_SECTION}`]: id,
      [`dimension${D_PROFONDEUR}`]: palier(profondeurMax),
    });
  };

  // Section « courante » = la dernière dont le titre est passé au-dessus du
  // tiers haut de l'écran. Le seuil de 2 s écarte le défilement rapide : on
  // veut les sections lues, pas celles survolées en descendant à la souris.
  let candidate = null;
  let depuis = 0;

  const observer = () => {
    const p = profondeur();
    if (p > profondeurMax) profondeurMax = p;

    for (const seuil of PALIERS) {
      if (profondeurMax >= seuil && !franchis.has(seuil)) {
        franchis.add(seuil);
        evenement('Lecture', 'Défilement', `${seuil} %`, undefined, {
          [`dimension${D_PROFONDEUR}`]: `${seuil} %`,
          [`dimension${D_SECTION}`]: derniereSection || undefined,
        });
      }
    }

    const limite = window.innerHeight / 3;
    let courante = null;
    for (const el of sections) {
      if (el.getBoundingClientRect().top <= limite) courante = el.id;
      else break;
    }
    if (courante !== candidate) { candidate = courante; depuis = Date.now(); }
    else if (candidate && Date.now() - depuis >= 2000) marquerSection(candidate);
  };

  let planifie = false;
  const auDefilement = () => {
    if (planifie) return;
    planifie = true;
    requestAnimationFrame(() => { planifie = false; observer(); });
  };

  addEventListener('scroll', auDefilement, { passive: true });
  addEventListener('resize', auDefilement, { passive: true });
  // Un visiteur peut rester immobile au milieu d'une section : sans ce battement,
  // le seuil des 2 s ne serait jamais réévalué faute d'événement de défilement.
  const battement = setInterval(observer, 1000);

  if (pageCourte()) setTimeout(() => { profondeurMax = 100; observer(); }, 3000);

  // ── Temps passé, onglet visible seulement ──────────────────────────────────
  // Un onglet laissé ouvert en arrière-plan pendant deux heures ne prouve
  // aucune lecture : on n'additionne que le temps où la page était à l'écran.
  let debut = document.visibilityState === 'visible' ? Date.now() : 0;
  let cumul = 0;
  const arreterChrono = () => {
    if (debut) { cumul += Date.now() - debut; debut = 0; }
  };

  let bilanEnvoye = false;
  const bilan = () => {
    if (bilanEnvoye) return;
    bilanEnvoye = true;
    arreterChrono();
    observer();
    clearInterval(battement);
    evenement('Lecture', 'Temps passé', page, Math.round(cumul / 1000), {
      [`dimension${D_PROFONDEUR}`]: palier(profondeurMax),
      [`dimension${D_SECTION}`]: derniereSection || undefined,
    });
  };

  addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { arreterChrono(); bilan(); }
    else if (!debut) debut = Date.now();
  });
  // `pagehide` couvre la fermeture d'onglet et le retour arrière ; `visibilitychange`
  // ne se déclenche pas partout dans ces cas-là (Safari, notamment).
  addEventListener('pagehide', bilan);

  // ───────────────────────────────────────────────────────────────────────────
  // CLICS
  // ───────────────────────────────────────────────────────────────────────────
  // Le bouton du dépôt (`…/playR-releases`) N'EST PAS un téléchargement : seul
  // `releases/latest` en est un, avec ou sans le nom du fichier derrière.
  const EST_INSTALLEUR = /playR-Setup\.exe|releases\/latest/i;

  // Où le clic a eu lieu. Déduit de la structure de la page plutôt qu'écrit dans
  // chaque lien : le HTML est traduit en dix langues, et un attribut oublié dans
  // une seule d'entre elles serait invisible.
  const emplacement = (el) => {
    const marque = el.closest('[data-stat]');
    if (marque) return marque.dataset.stat;
    if (el.closest('nav')) return 'menu';
    if (el.closest('footer')) return 'pied-de-page';
    if (el.closest('aside')) return 'sommaire';
    if (el.closest('header')) return 'accroche';
    const bloc = el.closest('section[id], article[id]');
    if (bloc) return bloc.id;
    // Repli : le dernier titre de section qui PRÉCÈDE le lien. Sur la doc, la FAQ
    // et le comparatif, les boutons de fin de page ne sont enfermés dans aucune
    // section — sans ce repli ils remonteraient tous sous « page », donc
    // impossibles à distinguer les uns des autres dans le rapport.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      if (sections[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) return sections[i].id;
    }
    return 'page';
  };

  const libelle = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);

  document.addEventListener('click', (e) => {
    const lien = e.target.closest('a[href]');
    if (!lien) return;
    const href = lien.getAttribute('href') || '';
    const ou = emplacement(lien);

    // 1. Téléchargement de l'installeur — l'événement le plus important du site.
    //    Son NOM porte la version proposée au moment du clic : c'est ce qui
    //    permet de dire « la 0.8.95 a été téléchargée N fois », des mois après.
    if (EST_INSTALLEUR.test(href)) {
      const v = versionConnue();
      evenement('Téléchargement', 'Installeur Windows', v || 'version inconnue', undefined, {
        [`dimension${D_EMPLACEMENT}`]: ou,
        // Jusqu'où la page avait été lue au moment du clic : c'est ce qui répond
        // à « est-ce qu'on télécharge après avoir lu, ou dès le premier écran ? »
        [`dimension${D_PROFONDEUR}`]: palier(profondeurMax),
      });
      return;
    }

    // 2. Changement de langue — dit si la langue servie par défaut tombe juste.
    const versLangue = lien.closest('details.langs') && lien.getAttribute('hreflang');
    if (versLangue) {
      evenement('Langue', 'Changement', `${langue} → ${versLangue}`);
      return;
    }

    // 3. Navigation interne : boutons d'appel à l'action et entrées de sommaire.
    //    Les liens sortants sont déjà comptés par `enableLinkTracking`, inutile
    //    de les doubler ici.
    const interne = !/^https?:/i.test(href) || href.includes(location.host);
    if (!interne) return;

    const estAncre = href.startsWith('#');
    const estBouton = lien.classList.contains('btn');
    const estSommaire = !!lien.closest('aside, .toc, .langs');
    if (!estAncre && !estBouton && !estSommaire) return;

    evenement(
      'Navigation',
      estSommaire && estAncre ? 'Sommaire' : libelle(lien) || 'Lien',
      href.replace(/^https?:\/\/[^/]+/i, '') || '/',
      undefined,
      { [`dimension${D_EMPLACEMENT}`]: ou },
    );
  }, { capture: true });

  // Une ancre suivie dans la page ne recharge rien : sans ça, arriver sur
  // `#casaos` par le sommaire ne laisserait aucune trace de section atteinte.
  addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (id) { derniereSection = id; marquerSection(id); }
  });
})();
